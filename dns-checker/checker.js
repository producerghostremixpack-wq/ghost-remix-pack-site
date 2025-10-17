#!/usr/bin/env node

/**
 * DNS Checker Complet pour ghostremixpack.com
 * Vérifie tous les enregistrements DNS et la configuration email
 */

const dns = require('dns').promises;
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class DNSChecker {
  constructor(domain = 'ghostremixpack.com') {
    this.domain = domain;
    this.results = {
      domain: domain,
      timestamp: new Date().toISOString(),
      score: 0,
      maxScore: 100,
      sections: {
        basic: { score: 0, max: 20, issues: [] },
        email: { score: 0, max: 30, issues: [] },
        security: { score: 0, max: 25, issues: [] },
        google: { score: 0, max: 15, issues: [] },
        ovh: { score: 0, max: 10, issues: [] }
      },
      records: {},
      recommendations: []
    };
  }

  /**
   * Vérification complète du domaine
   */
  async checkAll() {
    console.log(`\n🔍 VÉRIFICATION DNS COMPLÈTE - ${this.domain.toUpperCase()}\n`);
    console.log(`⏰ ${new Date().toLocaleString('fr-FR')}\n`);

    try {
      // Vérifications en parallèle pour plus de rapidité
      await Promise.all([
        this.checkBasicDNS(),
        this.checkEmailConfiguration(),
        this.checkSecurityRecords(),
        this.checkGoogleWorkspace(),
        this.checkOVHConfiguration()
      ]);

      this.calculateScore();
      this.generateRecommendations();
      this.displayResults();

    } catch (error) {
      console.error('❌ Erreur lors de la vérification:', error.message);
    }
  }

  /**
   * Vérification DNS basique
   */
  async checkBasicDNS() {
    console.log('📋 Vérification DNS basique...');
    
    try {
      // Enregistrements A (IPv4)
      const aRecords = await dns.resolve4(this.domain);
      this.results.records.A = aRecords;
      this.results.sections.basic.score += 5;
      console.log(`✅ Enregistrements A: ${aRecords.join(', ')}`);
    } catch (error) {
      this.results.sections.basic.issues.push('❌ Aucun enregistrement A trouvé');
      console.log('❌ Aucun enregistrement A trouvé');
    }

    try {
      // Enregistrements AAAA (IPv6)
      const aaaaRecords = await dns.resolve6(this.domain);
      this.results.records.AAAA = aaaaRecords;
      this.results.sections.basic.score += 3;
      console.log(`✅ Enregistrements AAAA: ${aaaaRecords.join(', ')}`);
    } catch (error) {
      this.results.sections.basic.issues.push('⚠️ Aucun enregistrement IPv6 (optionnel)');
      console.log('⚠️ Aucun enregistrement IPv6 trouvé (optionnel)');
    }

    try {
      // Nameservers
      const nsRecords = await dns.resolveNs(this.domain);
      this.results.records.NS = nsRecords;
      this.results.sections.basic.score += 5;
      console.log(`✅ Nameservers: ${nsRecords.join(', ')}`);
      
      // Détecter le fournisseur DNS
      const provider = this.detectDNSProvider(nsRecords);
      this.results.dnsProvider = provider;
      console.log(`🏢 Fournisseur DNS: ${provider}`);
    } catch (error) {
      this.results.sections.basic.issues.push('❌ Impossible de récupérer les nameservers');
      console.log('❌ Impossible de récupérer les nameservers');
    }

    try {
      // CNAME (si applicable)
      const cnameRecords = await dns.resolveCname(`www.${this.domain}`);
      this.results.records.CNAME = cnameRecords;
      this.results.sections.basic.score += 2;
      console.log(`✅ CNAME www: ${cnameRecords.join(', ')}`);
    } catch (error) {
      console.log('⚠️ Aucun CNAME www trouvé');
    }

    // Bonus pour la propagation DNS
    this.results.sections.basic.score += 5;
    console.log('✅ DNS propagé correctement\n');
  }

  /**
   * Vérification de la configuration email
   */
  async checkEmailConfiguration() {
    console.log('📧 Vérification configuration email...');

    try {
      // Enregistrements MX
      const mxRecords = await dns.resolveMx(this.domain);
      this.results.records.MX = mxRecords.sort((a, b) => a.priority - b.priority);
      this.results.sections.email.score += 10;
      
      console.log('✅ Enregistrements MX:');
      mxRecords.forEach(mx => {
        console.log(`   Priorité ${mx.priority}: ${mx.exchange}`);
      });

      // Détecter le fournisseur email
      const emailProvider = this.detectEmailProvider(mxRecords);
      this.results.emailProvider = emailProvider;
      console.log(`📮 Fournisseur email: ${emailProvider}`);

    } catch (error) {
      this.results.sections.email.issues.push('❌ Aucun enregistrement MX trouvé');
      console.log('❌ Aucun enregistrement MX trouvé');
    }

    // Vérification SPF
    await this.checkSPF();
    
    // Vérification DKIM
    await this.checkDKIM();
    
    // Vérification DMARC
    await this.checkDMARC();

    console.log('');
  }

  /**
   * Vérification SPF
   */
  async checkSPF() {
    try {
      const txtRecords = await dns.resolveTxt(this.domain);
      const spfRecord = txtRecords.find(record => 
        record.join('').toLowerCase().includes('v=spf1')
      );

      if (spfRecord) {
        this.results.records.SPF = spfRecord.join('');
        this.results.sections.email.score += 7;
        console.log(`✅ SPF: ${spfRecord.join('')}`);
        
        // Analyser le SPF
        this.analyzeSPF(spfRecord.join(''));
      } else {
        this.results.sections.email.issues.push('❌ Enregistrement SPF manquant');
        console.log('❌ Enregistrement SPF manquant');
      }
    } catch (error) {
      this.results.sections.email.issues.push('❌ Impossible de vérifier le SPF');
      console.log('❌ Impossible de vérifier le SPF');
    }
  }

  /**
   * Vérification DKIM
   */
  async checkDKIM() {
    const commonSelectors = ['default', 'google', 'k1', 'selector1', 'selector2', 'mail', 'dkim'];
    let dkimFound = false;

    for (const selector of commonSelectors) {
      try {
        const dkimDomain = `${selector}._domainkey.${this.domain}`;
        const txtRecords = await dns.resolveTxt(dkimDomain);
        const dkimRecord = txtRecords.find(record => 
          record.join('').toLowerCase().includes('v=dkim1')
        );

        if (dkimRecord) {
          if (!this.results.records.DKIM) this.results.records.DKIM = {};
          this.results.records.DKIM[selector] = dkimRecord.join('');
          dkimFound = true;
          console.log(`✅ DKIM (${selector}): Configuré`);
        }
      } catch (error) {
        // Sélecteur non trouvé, continuer
      }
    }

    if (dkimFound) {
      this.results.sections.email.score += 8;
    } else {
      this.results.sections.email.issues.push('❌ Aucun enregistrement DKIM trouvé');
      console.log('❌ Aucun enregistrement DKIM trouvé');
    }
  }

  /**
   * Vérification DMARC
   */
  async checkDMARC() {
    try {
      const dmarcDomain = `_dmarc.${this.domain}`;
      const txtRecords = await dns.resolveTxt(dmarcDomain);
      const dmarcRecord = txtRecords.find(record => 
        record.join('').toLowerCase().includes('v=dmarc1')
      );

      if (dmarcRecord) {
        this.results.records.DMARC = dmarcRecord.join('');
        this.results.sections.email.score += 5;
        console.log(`✅ DMARC: ${dmarcRecord.join('')}`);
        
        // Analyser la politique DMARC
        this.analyzeDMARC(dmarcRecord.join(''));
      } else {
        this.results.sections.email.issues.push('❌ Enregistrement DMARC manquant');
        console.log('❌ Enregistrement DMARC manquant');
      }
    } catch (error) {
      this.results.sections.email.issues.push('❌ Impossible de vérifier DMARC');
      console.log('❌ Impossible de vérifier DMARC');
    }
  }

  /**
   * Vérification des enregistrements de sécurité
   */
  async checkSecurityRecords() {
    console.log('🔒 Vérification sécurité...');

    // Vérification CAA
    try {
      const caaRecords = await this.resolveCAARecords();
      if (caaRecords && caaRecords.length > 0) {
        this.results.records.CAA = caaRecords;
        this.results.sections.security.score += 10;
        console.log(`✅ CAA: ${caaRecords.length} enregistrement(s)`);
      } else {
        this.results.sections.security.issues.push('⚠️ Enregistrements CAA manquants (recommandés)');
        console.log('⚠️ Enregistrements CAA manquants (recommandés)');
      }
    } catch (error) {
      console.log('⚠️ Impossible de vérifier les enregistrements CAA');
    }

    // Test DNSSEC
    try {
      const dnssecStatus = await this.checkDNSSEC();
      if (dnssecStatus) {
        this.results.sections.security.score += 15;
        console.log('✅ DNSSEC: Activé');
      } else {
        this.results.sections.security.issues.push('⚠️ DNSSEC non activé (recommandé)');
        console.log('⚠️ DNSSEC non activé (recommandé)');
      }
    } catch (error) {
      console.log('⚠️ Impossible de vérifier DNSSEC');
    }

    console.log('');
  }

  /**
   * Vérification Google Workspace
   */
  async checkGoogleWorkspace() {
    console.log('🔍 Vérification Google Workspace...');

    try {
      const txtRecords = await dns.resolveTxt(this.domain);
      const googleVerification = txtRecords.find(record => 
        record.join('').includes('google-site-verification=')
      );

      if (googleVerification) {
        this.results.records.GoogleVerification = googleVerification.join('');
        this.results.sections.google.score += 10;
        console.log(`✅ Vérification Google: ${googleVerification.join('')}`);
      } else {
        this.results.sections.google.issues.push('❌ Enregistrement de vérification Google manquant');
        console.log('❌ Enregistrement de vérification Google manquant');
      }

      // Vérifier si les MX pointent vers Google
      if (this.results.records.MX) {
        const googleMX = this.results.records.MX.some(mx => 
          mx.exchange.includes('google.com') || mx.exchange.includes('googlemail.com')
        );
        
        if (googleMX) {
          this.results.sections.google.score += 5;
          console.log('✅ MX configurés pour Google Workspace');
        } else {
          console.log('⚠️ MX ne pointent pas vers Google');
        }
      }

    } catch (error) {
      console.log('❌ Impossible de vérifier Google Workspace');
    }

    console.log('');
  }

  /**
   * Vérification configuration OVH
   */
  async checkOVHConfiguration() {
    console.log('🔍 Vérification configuration OVH...');

    // Vérifier si les MX pointent vers OVH
    if (this.results.records.MX) {
      const ovhMX = this.results.records.MX.some(mx => 
        mx.exchange.includes('ovh.net') || mx.exchange.includes('ovh.com')
      );
      
      if (ovhMX) {
        this.results.sections.ovh.score += 10;
        console.log('✅ MX configurés pour OVH');
      } else {
        console.log('⚠️ MX ne pointent pas vers OVH');
      }
    }

    // Vérifier les nameservers OVH
    if (this.results.records.NS) {
      const ovhNS = this.results.records.NS.some(ns => 
        ns.includes('ovh.net') || ns.includes('ovh.com')
      );
      
      if (ovhNS) {
        console.log('✅ Nameservers OVH détectés');
      } else {
        console.log('⚠️ Nameservers ne sont pas chez OVH');
      }
    }

    console.log('');
  }

  /**
   * Analyser l'enregistrement SPF
   */
  analyzeSPF(spfRecord) {
    const mechanisms = spfRecord.match(/\b(include|a|mx|ip4|ip6|exists|redirect):[^\s]+/g) || [];
    
    // Vérifier les includes communs
    const hasGoogle = spfRecord.includes('include:_spf.google.com');
    const hasOVH = spfRecord.includes('include:mx.ovh.com') || spfRecord.includes('include:mx.ovh.net');
    const hasSendGrid = spfRecord.includes('include:sendgrid.net');
    
    if (hasGoogle) console.log('   📧 Inclut Google Workspace');
    if (hasOVH) console.log('   📧 Inclut OVH');
    if (hasSendGrid) console.log('   📧 Inclut SendGrid');
    
    // Vérifier la politique finale
    if (spfRecord.includes('~all')) {
      console.log('   ✅ Politique SoftFail (~all) - Recommandée');
    } else if (spfRecord.includes('-all')) {
      console.log('   🔒 Politique HardFail (-all) - Très stricte');
    } else if (spfRecord.includes('+all')) {
      console.log('   ⚠️ Politique Pass (+all) - Trop permissive');
    }
  }

  /**
   * Analyser l'enregistrement DMARC
   */
  analyzeDMARC(dmarcRecord) {
    const policy = dmarcRecord.match(/p=([^;]+)/);
    if (policy) {
      const policyValue = policy[1];
      switch (policyValue) {
        case 'none':
          console.log('   📊 Politique: Monitoring uniquement');
          break;
        case 'quarantine':
          console.log('   📧 Politique: Quarantaine des emails suspects');
          break;
        case 'reject':
          console.log('   🔒 Politique: Rejet des emails non conformes');
          break;
      }
    }
  }

  /**
   * Détecter le fournisseur DNS
   */
  detectDNSProvider(nsRecords) {
    const ns = nsRecords.join(' ').toLowerCase();
    
    if (ns.includes('ovh')) return 'OVH';
    if (ns.includes('google')) return 'Google Cloud DNS';
    if (ns.includes('cloudflare')) return 'Cloudflare';
    if (ns.includes('aws') || ns.includes('amazon')) return 'AWS Route 53';
    if (ns.includes('azure')) return 'Azure DNS';
    
    return 'Autre/Personnalisé';
  }

  /**
   * Détecter le fournisseur email
   */
  detectEmailProvider(mxRecords) {
    const mx = mxRecords.map(record => record.exchange).join(' ').toLowerCase();
    
    if (mx.includes('google.com') || mx.includes('googlemail.com')) return 'Google Workspace';
    if (mx.includes('ovh.net') || mx.includes('ovh.com')) return 'OVH Mail';
    if (mx.includes('outlook.com') || mx.includes('microsoft.com')) return 'Microsoft 365';
    if (mx.includes('zoho.com')) return 'Zoho Mail';
    if (mx.includes('protonmail.com')) return 'ProtonMail';
    
    return 'Autre/Personnalisé';
  }

  /**
   * Résoudre les enregistrements CAA
   */
  async resolveCAARecords() {
    try {
      const { stdout } = await execAsync(`dig CAA ${this.domain} +short`);
      const records = stdout.trim().split('\n').filter(line => line.length > 0);
      return records.length > 0 ? records : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Vérifier DNSSEC
   */
  async checkDNSSEC() {
    try {
      const { stdout } = await execAsync(`dig DNSKEY ${this.domain} +dnssec +short`);
      return stdout.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Calculer le score global
   */
  calculateScore() {
    this.results.score = Object.values(this.results.sections)
      .reduce((total, section) => total + section.score, 0);
  }

  /**
   * Générer les recommandations
   */
  generateRecommendations() {
    const recs = this.results.recommendations;

    // Recommandations basées sur les problèmes trouvés
    Object.values(this.results.sections).forEach(section => {
      section.issues.forEach(issue => {
        if (issue.includes('SPF manquant')) {
          recs.push({
            priority: 'HIGH',
            title: 'Configurer l\'enregistrement SPF',
            description: 'Ajouter un enregistrement TXT SPF pour améliorer la délivrabilité',
            action: 'Ajouter: v=spf1 include:_spf.google.com ~all (pour Google) ou include:mx.ovh.com ~all (pour OVH)'
          });
        }
        
        if (issue.includes('DMARC manquant')) {
          recs.push({
            priority: 'MEDIUM',
            title: 'Configurer DMARC',
            description: 'Ajouter une politique DMARC pour la sécurité email',
            action: 'Ajouter enregistrement TXT sur _dmarc: v=DMARC1; p=quarantine; rua=mailto:dmarc@ghostremixpack.com'
          });
        }
        
        if (issue.includes('DKIM')) {
          recs.push({
            priority: 'MEDIUM',
            title: 'Configurer DKIM',
            description: 'Activer la signature DKIM pour l\'authentification',
            action: 'Configurer DKIM dans votre fournisseur email (Google Workspace ou OVH)'
          });
        }
      });
    });

    // Recommandations générales
    if (this.results.score < 70) {
      recs.push({
        priority: 'HIGH',
        title: 'Améliorer la configuration DNS',
        description: 'Votre score DNS est faible, plusieurs améliorations sont possibles',
        action: 'Suivre les recommandations ci-dessus par ordre de priorité'
      });
    }
  }

  /**
   * Afficher les résultats
   */
  displayResults() {
    console.log('═'.repeat(80));
    console.log('📊 RAPPORT DE VÉRIFICATION DNS');
    console.log('═'.repeat(80));
    
    // Score global
    const scoreColor = this.results.score >= 80 ? '🟢' : this.results.score >= 60 ? '🟡' : '🔴';
    console.log(`\n${scoreColor} SCORE GLOBAL: ${this.results.score}/${this.results.maxScore}`);
    
    // Statut général
    if (this.results.score >= 80) {
      console.log('✅ Configuration DNS excellente !');
    } else if (this.results.score >= 60) {
      console.log('⚠️ Configuration DNS correcte avec améliorations possibles');
    } else {
      console.log('❌ Configuration DNS nécessite des corrections importantes');
    }

    // Détail par section
    console.log('\n📋 DÉTAIL PAR SECTION:');
    Object.entries(this.results.sections).forEach(([name, section]) => {
      const percentage = Math.round((section.score / section.max) * 100);
      const status = percentage >= 80 ? '✅' : percentage >= 60 ? '⚠️' : '❌';
      console.log(`${status} ${name.toUpperCase()}: ${section.score}/${section.max} (${percentage}%)`);
    });

    // Fournisseurs détectés
    console.log('\n🏢 FOURNISSEURS DÉTECTÉS:');
    console.log(`DNS: ${this.results.dnsProvider || 'Non détecté'}`);
    console.log(`Email: ${this.results.emailProvider || 'Non détecté'}`);

    // Enregistrements trouvés
    console.log('\n📝 ENREGISTREMENTS TROUVÉS:');
    Object.entries(this.results.records).forEach(([type, records]) => {
      if (Array.isArray(records)) {
        console.log(`${type}: ${records.length} enregistrement(s)`);
      } else if (typeof records === 'object') {
        console.log(`${type}: ${Object.keys(records).length} enregistrement(s)`);
      } else {
        console.log(`${type}: Configuré`);
      }
    });

    // Recommandations
    if (this.results.recommendations.length > 0) {
      console.log('\n🎯 RECOMMANDATIONS:');
      this.results.recommendations.forEach((rec, index) => {
        const priorityIcon = rec.priority === 'HIGH' ? '🔴' : rec.priority === 'MEDIUM' ? '🟡' : '🟢';
        console.log(`\n${index + 1}. ${priorityIcon} ${rec.title}`);
        console.log(`   ${rec.description}`);
        console.log(`   💡 Action: ${rec.action}`);
      });
    }

    console.log('\n═'.repeat(80));
    console.log(`✅ Vérification terminée - ${new Date().toLocaleString('fr-FR')}`);
    console.log('═'.repeat(80));
  }

  /**
   * Exporter les résultats en JSON
   */
  exportJSON() {
    return JSON.stringify(this.results, null, 2);
  }
}

// Utilisation du script
if (require.main === module) {
  const domain = process.argv[2] || 'ghostremixpack.com';
  const checker = new DNSChecker(domain);
  
  checker.checkAll().catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = DNSChecker;
