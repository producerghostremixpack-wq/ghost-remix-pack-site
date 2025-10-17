#!/usr/bin/env node

/**
 * Générateur de Configuration DNS
 * Génère la configuration DNS optimale selon le fournisseur choisi
 */

const readline = require('readline');

class DNSConfigGenerator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Démarrer le générateur interactif
   */
  async start() {
    console.log('\n🔧 GÉNÉRATEUR DE CONFIGURATION DNS');
    console.log('═'.repeat(50));
    console.log('Génère la configuration DNS optimale pour votre domaine\n');

    try {
      const domain = await this.askQuestion('🌐 Nom de domaine (ex: ghostremixpack.com): ');
      const provider = await this.chooseProvider();
      const features = await this.chooseFeatures();

      console.log('\n⚙️ Génération de la configuration...\n');

      const config = this.generateConfig(domain, provider, features);
      this.displayConfig(config);

      const exportChoice = await this.askQuestion('\n💾 Exporter la configuration ? (o/N): ');
      if (exportChoice.toLowerCase() === 'o' || exportChoice.toLowerCase() === 'oui') {
        await this.exportConfig(config, domain);
      }

    } catch (error) {
      console.error('❌ Erreur:', error.message);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Poser une question à l'utilisateur
   */
  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Choisir le fournisseur email
   */
  async chooseProvider() {
    console.log('\n📧 Choisissez votre fournisseur email:');
    console.log('1. Google Workspace (Gmail professionnel)');
    console.log('2. OVH Email');
    console.log('3. Microsoft 365');
    console.log('4. Configuration mixte (OVH + SendGrid)');
    console.log('5. Autre/Personnalisé');

    const choice = await this.askQuestion('\nVotre choix (1-5): ');

    switch (choice) {
      case '1': return 'google';
      case '2': return 'ovh';
      case '3': return 'microsoft';
      case '4': return 'mixed';
      case '5': return 'custom';
      default: 
        console.log('⚠️ Choix invalide, utilisation de Google Workspace par défaut');
        return 'google';
    }
  }

  /**
   * Choisir les fonctionnalités
   */
  async chooseFeatures() {
    console.log('\n🔧 Fonctionnalités à configurer:');
    
    const spf = await this.askQuestion('📧 Configurer SPF ? (O/n): ');
    const dkim = await this.askQuestion('🔐 Configurer DKIM ? (O/n): ');
    const dmarc = await this.askQuestion('🛡️ Configurer DMARC ? (O/n): ');
    const www = await this.askQuestion('🌐 Redirection www ? (O/n): ');
    const security = await this.askQuestion('🔒 Enregistrements de sécurité ? (o/N): ');

    return {
      spf: !spf || spf.toLowerCase() !== 'n',
      dkim: !dkim || dkim.toLowerCase() !== 'n',
      dmarc: !dmarc || dmarc.toLowerCase() !== 'n',
      www: !www || www.toLowerCase() !== 'n',
      security: security.toLowerCase() === 'o' || security.toLowerCase() === 'oui'
    };
  }

  /**
   * Générer la configuration DNS
   */
  generateConfig(domain, provider, features) {
    const config = {
      domain,
      provider,
      timestamp: new Date().toISOString(),
      records: []
    };

    // Enregistrements MX selon le fournisseur
    config.records.push(...this.generateMXRecords(provider));

    // SPF
    if (features.spf) {
      config.records.push(this.generateSPFRecord(provider));
    }

    // DKIM
    if (features.dkim) {
      config.records.push(...this.generateDKIMRecords(provider, domain));
    }

    // DMARC
    if (features.dmarc) {
      config.records.push(this.generateDMARCRecord(domain));
    }

    // Redirection www
    if (features.www) {
      config.records.push({
        type: 'CNAME',
        name: 'www',
        value: domain,
        ttl: 3600,
        description: 'Redirection www vers le domaine principal'
      });
    }

    // Enregistrements de sécurité
    if (features.security) {
      config.records.push(...this.generateSecurityRecords(domain));
    }

    // Enregistrements spéciaux selon le fournisseur
    config.records.push(...this.generateProviderSpecificRecords(provider, domain));

    return config;
  }

  /**
   * Générer les enregistrements MX
   */
  generateMXRecords(provider) {
    const mxRecords = [];

    switch (provider) {
      case 'google':
        mxRecords.push(
          { type: 'MX', name: '@', value: 'aspmx.l.google.com.', priority: 1, ttl: 3600 },
          { type: 'MX', name: '@', value: 'alt1.aspmx.l.google.com.', priority: 5, ttl: 3600 },
          { type: 'MX', name: '@', value: 'alt2.aspmx.l.google.com.', priority: 5, ttl: 3600 },
          { type: 'MX', name: '@', value: 'alt3.aspmx.l.google.com.', priority: 10, ttl: 3600 },
          { type: 'MX', name: '@', value: 'alt4.aspmx.l.google.com.', priority: 10, ttl: 3600 }
        );
        break;

      case 'ovh':
        mxRecords.push(
          { type: 'MX', name: '@', value: 'mx1.ovh.net.', priority: 1, ttl: 3600 },
          { type: 'MX', name: '@', value: 'mx2.ovh.net.', priority: 5, ttl: 3600 },
          { type: 'MX', name: '@', value: 'mx3.ovh.net.', priority: 100, ttl: 3600 }
        );
        break;

      case 'microsoft':
        mxRecords.push(
          { type: 'MX', name: '@', value: 'yourdomain-com.mail.protection.outlook.com.', priority: 0, ttl: 3600 }
        );
        break;

      case 'mixed':
        mxRecords.push(
          { type: 'MX', name: '@', value: 'mx1.ovh.net.', priority: 1, ttl: 3600 },
          { type: 'MX', name: '@', value: 'mx2.ovh.net.', priority: 5, ttl: 3600 }
        );
        break;

      default:
        mxRecords.push(
          { type: 'MX', name: '@', value: 'mail.yourdomain.com.', priority: 10, ttl: 3600, description: 'À personnaliser selon votre fournisseur' }
        );
    }

    return mxRecords;
  }

  /**
   * Générer l'enregistrement SPF
   */
  generateSPFRecord(provider) {
    let spfValue = 'v=spf1';

    switch (provider) {
      case 'google':
        spfValue += ' include:_spf.google.com';
        break;
      case 'ovh':
        spfValue += ' include:mx.ovh.com';
        break;
      case 'microsoft':
        spfValue += ' include:spf.protection.outlook.com';
        break;
      case 'mixed':
        spfValue += ' include:mx.ovh.com include:sendgrid.net';
        break;
      default:
        spfValue += ' include:_spf.yourdomain.com';
    }

    spfValue += ' ~all';

    return {
      type: 'TXT',
      name: '@',
      value: `"${spfValue}"`,
      ttl: 3600,
      description: 'Enregistrement SPF pour la délivrabilité email'
    };
  }

  /**
   * Générer les enregistrements DKIM
   */
  generateDKIMRecords(provider, domain) {
    const dkimRecords = [];

    switch (provider) {
      case 'google':
        dkimRecords.push({
          type: 'TXT',
          name: 'google._domainkey',
          value: '"v=DKIM1; k=rsa; p=VOTRE_CLE_PUBLIQUE_GOOGLE"',
          ttl: 3600,
          description: 'DKIM Google - Récupérer la clé dans Google Admin Console'
        });
        break;

      case 'ovh':
        dkimRecords.push({
          type: 'TXT',
          name: 'ovh._domainkey',
          value: '"v=DKIM1; k=rsa; p=VOTRE_CLE_PUBLIQUE_OVH"',
          ttl: 3600,
          description: 'DKIM OVH - Configurer dans l\'interface OVH'
        });
        break;

      case 'mixed':
        dkimRecords.push(
          {
            type: 'TXT',
            name: 'ovh._domainkey',
            value: '"v=DKIM1; k=rsa; p=VOTRE_CLE_PUBLIQUE_OVH"',
            ttl: 3600,
            description: 'DKIM OVH'
          },
          {
            type: 'TXT',
            name: 's1._domainkey',
            value: '"v=DKIM1; k=rsa; p=VOTRE_CLE_PUBLIQUE_SENDGRID"',
            ttl: 3600,
            description: 'DKIM SendGrid'
          }
        );
        break;

      default:
        dkimRecords.push({
          type: 'TXT',
          name: 'default._domainkey',
          value: '"v=DKIM1; k=rsa; p=VOTRE_CLE_PUBLIQUE"',
          ttl: 3600,
          description: 'DKIM - À configurer selon votre fournisseur'
        });
    }

    return dkimRecords;
  }

  /**
   * Générer l'enregistrement DMARC
   */
  generateDMARCRecord(domain) {
    return {
      type: 'TXT',
      name: '_dmarc',
      value: `"v=DMARC1; p=quarantine; rua=mailto:dmarc@${domain}; ruf=mailto:dmarc@${domain}; fo=1"`,
      ttl: 3600,
      description: 'Politique DMARC pour la sécurité email'
    };
  }

  /**
   * Générer les enregistrements de sécurité
   */
  generateSecurityRecords(domain) {
    return [
      {
        type: 'CAA',
        name: '@',
        value: '0 issue "letsencrypt.org"',
        ttl: 3600,
        description: 'Autorisation Let\'s Encrypt pour les certificats SSL'
      },
      {
        type: 'CAA',
        name: '@',
        value: '0 iodef "mailto:security@' + domain + '"',
        ttl: 3600,
        description: 'Notification des violations de certificats'
      }
    ];
  }

  /**
   * Générer les enregistrements spécifiques au fournisseur
   */
  generateProviderSpecificRecords(provider, domain) {
    const records = [];

    switch (provider) {
      case 'google':
        records.push({
          type: 'TXT',
          name: '@',
          value: '"google-site-verification=VOTRE_CODE_VERIFICATION_GOOGLE"',
          ttl: 3600,
          description: 'Vérification du domaine Google Workspace - À récupérer dans Google Admin'
        });
        break;

      case 'microsoft':
        records.push({
          type: 'TXT',
          name: '@',
          value: '"MS=msXXXXXXXX"',
          ttl: 3600,
          description: 'Vérification du domaine Microsoft 365'
        });
        break;
    }

    return records;
  }

  /**
   * Afficher la configuration générée
   */
  displayConfig(config) {
    console.log('═'.repeat(80));
    console.log(`📋 CONFIGURATION DNS POUR ${config.domain.toUpperCase()}`);
    console.log('═'.repeat(80));
    console.log(`🏢 Fournisseur: ${this.getProviderName(config.provider)}`);
    console.log(`⏰ Généré le: ${new Date(config.timestamp).toLocaleString('fr-FR')}`);
    console.log('');

    // Grouper les enregistrements par type
    const recordsByType = {};
    config.records.forEach(record => {
      if (!recordsByType[record.type]) {
        recordsByType[record.type] = [];
      }
      recordsByType[record.type].push(record);
    });

    // Afficher chaque type d'enregistrement
    Object.entries(recordsByType).forEach(([type, records]) => {
      console.log(`\n📝 ENREGISTREMENTS ${type}:`);
      console.log('-'.repeat(50));

      records.forEach(record => {
        let line = `${record.name.padEnd(20)} ${record.ttl.toString().padEnd(6)} ${type.padEnd(6)}`;
        
        if (record.priority !== undefined) {
          line += ` ${record.priority.toString().padEnd(3)} ${record.value}`;
        } else {
          line += ` ${record.value}`;
        }

        console.log(line);
        
        if (record.description) {
          console.log(`${''.padEnd(20)} ↳ ${record.description}`);
        }
      });
    });

    // Instructions spéciales
    console.log('\n🔧 INSTRUCTIONS SPÉCIALES:');
    console.log('-'.repeat(50));

    switch (config.provider) {
      case 'google':
        console.log('1. Récupérez votre code de vérification dans Google Admin Console');
        console.log('2. Configurez DKIM dans Admin Console > Apps > Google Workspace > Gmail > Authenticate email');
        console.log('3. Attendez 24-48h pour la propagation DNS');
        break;

      case 'ovh':
        console.log('1. Configurez DKIM dans votre interface OVH');
        console.log('2. Activez la signature DKIM pour votre domaine');
        console.log('3. Vérifiez la configuration dans l\'espace client OVH');
        break;

      case 'mixed':
        console.log('1. Configurez DKIM OVH dans votre interface OVH');
        console.log('2. Configurez DKIM SendGrid dans votre compte SendGrid');
        console.log('3. Testez l\'envoi avec les deux services');
        break;
    }

    console.log('\n⚠️ IMPORTANT:');
    console.log('- Remplacez les valeurs "VOTRE_CLE_*" par les vraies clés de vos fournisseurs');
    console.log('- La propagation DNS peut prendre 24-48 heures');
    console.log('- Testez votre configuration avec des outils comme MXToolbox');
    console.log('- Sauvegardez votre ancienne configuration avant les modifications');

    console.log('\n═'.repeat(80));
  }

  /**
   * Obtenir le nom du fournisseur
   */
  getProviderName(provider) {
    const names = {
      google: 'Google Workspace',
      ovh: 'OVH Email',
      microsoft: 'Microsoft 365',
      mixed: 'Configuration Mixte (OVH + SendGrid)',
      custom: 'Configuration Personnalisée'
    };
    return names[provider] || 'Inconnu';
  }

  /**
   * Exporter la configuration
   */
  async exportConfig(config, domain) {
    const fs = require('fs');
    
    // Format pour copier-coller dans l'interface DNS
    let dnsZone = `; Configuration DNS pour ${domain}\n`;
    dnsZone += `; Généré le ${new Date().toLocaleString('fr-FR')}\n`;
    dnsZone += `; Fournisseur: ${this.getProviderName(config.provider)}\n\n`;

    config.records.forEach(record => {
      if (record.description) {
        dnsZone += `; ${record.description}\n`;
      }
      
      let line = `${record.name}\t${record.ttl}\tIN\t${record.type}`;
      
      if (record.priority !== undefined) {
        line += `\t${record.priority}\t${record.value}`;
      } else {
        line += `\t${record.value}`;
      }
      
      dnsZone += line + '\n\n';
    });

    // Format JSON pour les APIs
    const jsonConfig = JSON.stringify(config, null, 2);

    // Sauvegarder les fichiers
    const timestamp = new Date().toISOString().slice(0, 10);
    const zoneFile = `${domain}-dns-${timestamp}.zone`;
    const jsonFile = `${domain}-config-${timestamp}.json`;

    fs.writeFileSync(zoneFile, dnsZone);
    fs.writeFileSync(jsonFile, jsonConfig);

    console.log(`✅ Configuration exportée:`);
    console.log(`📄 Zone DNS: ${zoneFile}`);
    console.log(`📊 JSON: ${jsonFile}`);
  }
}

// Utilisation du générateur
if (require.main === module) {
  const generator = new DNSConfigGenerator();
  generator.start().catch(console.error);
}

module.exports = DNSConfigGenerator;
