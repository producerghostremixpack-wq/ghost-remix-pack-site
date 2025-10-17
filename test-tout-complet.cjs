#!/usr/bin/env node

/**
 * Test complet de toutes les fonctionnalités Ghost Remix Pack
 */

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class TestComplet {
  constructor() {
    this.results = {
      dns: { score: 0, tests: [] },
      backend: { score: 0, tests: [] },
      frontend: { score: 0, tests: [] },
      email: { score: 0, tests: [] },
      files: { score: 0, tests: [] }
    };
  }

  async runAllTests() {
    console.log('\n🧪 TEST COMPLET - GHOST REMIX PACK');
    console.log('═'.repeat(60));
    console.log(`⏰ ${new Date().toLocaleString('fr-FR')}\n`);

    try {
      await this.testFiles();
      await this.testDNS();
      await this.testBackend();
      await this.testEmail();
      await this.testFrontend();
      
      this.displayResults();
    } catch (error) {
      console.error('❌ Erreur lors des tests:', error.message);
    }
  }

  async testFiles() {
    console.log('📁 Test des fichiers essentiels...');
    
    const files = [
      { path: '.env', name: 'Configuration environnement', critical: true },
      { path: 'package.json', name: 'Package principal', critical: true },
      { path: 'backend/package.json', name: 'Package backend', critical: true },
      { path: 'backend/server.js', name: 'Serveur backend', critical: true },
      { path: 'src/App.tsx', name: 'Application React', critical: true },
      { path: 'public/sitemap.xml', name: 'Sitemap SEO', critical: false },
      { path: 'public/robots.txt', name: 'Robots.txt', critical: false },
      { path: 'dns-checker/checker.js', name: 'DNS Checker', critical: false },
      { path: 'GUIDE-DNS-OVH-COMPLET.md', name: 'Guide DNS', critical: false }
    ];

    let score = 0;
    const fs = require('fs');

    for (const file of files) {
      try {
        if (fs.existsSync(file.path)) {
          console.log(`✅ ${file.name}`);
          this.results.files.tests.push({ name: file.name, status: 'OK' });
          score += file.critical ? 20 : 10;
        } else {
          console.log(`❌ ${file.name} - MANQUANT`);
          this.results.files.tests.push({ name: file.name, status: 'MANQUANT' });
        }
      } catch (error) {
        console.log(`⚠️ ${file.name} - ERREUR`);
        this.results.files.tests.push({ name: file.name, status: 'ERREUR' });
      }
    }

    this.results.files.score = Math.min(score, 100);
    console.log('');
  }

  async testDNS() {
    console.log('🌐 Test de la configuration DNS...');
    
    try {
      // Test avec notre outil DNS Checker
      const { stdout } = await execAsync('cd dns-checker && node checker.js ghostremixpack.com');
      
      // Analyser la sortie pour extraire le score
      const scoreMatch = stdout.match(/SCORE GLOBAL: (\d+)\/100/);
      if (scoreMatch) {
        const score = parseInt(scoreMatch[1]);
        this.results.dns.score = score;
        console.log(`📊 Score DNS: ${score}/100`);
        
        if (score >= 80) {
          console.log('✅ Configuration DNS excellente');
        } else if (score >= 60) {
          console.log('⚠️ Configuration DNS correcte');
        } else {
          console.log('❌ Configuration DNS nécessite des améliorations');
        }
      } else {
        console.log('⚠️ Impossible de déterminer le score DNS');
        this.results.dns.score = 0;
      }

      this.results.dns.tests.push({ name: 'DNS Checker', status: 'OK' });

    } catch (error) {
      console.log('❌ Erreur lors du test DNS');
      this.results.dns.tests.push({ name: 'DNS Checker', status: 'ERREUR' });
      this.results.dns.score = 0;
    }

    console.log('');
  }

  async testBackend() {
    console.log('🔧 Test du backend...');
    
    try {
      // Test de santé du backend
      const response = await fetch('http://localhost:3001/api/health');
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend accessible');
        console.log(`📡 Status: ${data.status}`);
        this.results.backend.score += 40;
        this.results.backend.tests.push({ name: 'Santé backend', status: 'OK' });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }

      // Test de l'API de contact
      try {
        const contactResponse = await fetch('http://localhost:3001/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test Auto',
            email: 'test@example.com',
            message: 'Test automatique'
          })
        });

        if (contactResponse.status === 500) {
          // Erreur attendue si SendGrid non configuré
          console.log('⚠️ API Contact: SendGrid non configuré (normal)');
          this.results.backend.score += 30;
          this.results.backend.tests.push({ name: 'API Contact', status: 'PARTIEL' });
        } else if (contactResponse.ok) {
          console.log('✅ API Contact: Fonctionnelle');
          this.results.backend.score += 40;
          this.results.backend.tests.push({ name: 'API Contact', status: 'OK' });
        }
      } catch (error) {
        console.log('❌ API Contact: Non accessible');
        this.results.backend.tests.push({ name: 'API Contact', status: 'ERREUR' });
      }

      // Test de l'API Newsletter
      try {
        const newsletterResponse = await fetch('http://localhost:3001/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com' })
        });

        if (newsletterResponse.status === 500) {
          console.log('⚠️ API Newsletter: SendGrid non configuré (normal)');
          this.results.backend.score += 20;
          this.results.backend.tests.push({ name: 'API Newsletter', status: 'PARTIEL' });
        } else if (newsletterResponse.ok) {
          console.log('✅ API Newsletter: Fonctionnelle');
          this.results.backend.score += 30;
          this.results.backend.tests.push({ name: 'API Newsletter', status: 'OK' });
        }
      } catch (error) {
        console.log('❌ API Newsletter: Non accessible');
        this.results.backend.tests.push({ name: 'API Newsletter', status: 'ERREUR' });
      }

    } catch (error) {
      console.log('❌ Backend non accessible');
      console.log('💡 Démarrez le backend avec: cd backend && npm run dev');
      this.results.backend.tests.push({ name: 'Backend', status: 'NON_ACCESSIBLE' });
      this.results.backend.score = 0;
    }

    this.results.backend.score = Math.min(this.results.backend.score, 100);
    console.log('');
  }

  async testEmail() {
    console.log('📧 Test de la configuration email...');
    
    // Vérifier la configuration .env
    const fs = require('fs');
    try {
      if (fs.existsSync('.env')) {
        const envContent = fs.readFileSync('.env', 'utf8');
        
        if (envContent.includes('SENDGRID_API_KEY=SG.')) {
          if (envContent.includes('SG.REMPLACEZ_PAR_VOTRE_CLE_SENDGRID')) {
            console.log('⚠️ SendGrid: Clé par défaut (à configurer)');
            this.results.email.score += 20;
            this.results.email.tests.push({ name: 'SendGrid Config', status: 'A_CONFIGURER' });
          } else {
            console.log('✅ SendGrid: Clé API configurée');
            this.results.email.score += 50;
            this.results.email.tests.push({ name: 'SendGrid Config', status: 'OK' });
          }
        } else {
          console.log('❌ SendGrid: Clé API manquante');
          this.results.email.tests.push({ name: 'SendGrid Config', status: 'MANQUANT' });
        }

        if (envContent.includes('contact@ghostremixpack.com')) {
          console.log('✅ Email: Adresse configurée');
          this.results.email.score += 30;
          this.results.email.tests.push({ name: 'Email Address', status: 'OK' });
        }

      } else {
        console.log('❌ Fichier .env manquant');
        this.results.email.tests.push({ name: 'Configuration', status: 'MANQUANT' });
      }
    } catch (error) {
      console.log('❌ Erreur lecture configuration email');
      this.results.email.tests.push({ name: 'Configuration', status: 'ERREUR' });
    }

    this.results.email.score = Math.min(this.results.email.score, 100);
    console.log('');
  }

  async testFrontend() {
    console.log('🎨 Test du frontend...');
    
    try {
      // Test d'accès au frontend
      const response = await fetch('http://localhost:5173');
      
      if (response.ok) {
        console.log('✅ Frontend accessible');
        this.results.frontend.score += 50;
        this.results.frontend.tests.push({ name: 'Frontend Access', status: 'OK' });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }

    } catch (error) {
      console.log('❌ Frontend non accessible');
      console.log('💡 Démarrez le frontend avec: npm run dev');
      this.results.frontend.tests.push({ name: 'Frontend', status: 'NON_ACCESSIBLE' });
      this.results.frontend.score = 0;
    }

    // Test des fichiers React
    const fs = require('fs');
    const reactFiles = [
      'src/components/Newsletter.tsx',
      'src/components/NewsletterConfirm.tsx',
      'src/components/ContactPage.tsx'
    ];

    let reactScore = 0;
    for (const file of reactFiles) {
      if (fs.existsSync(file)) {
        reactScore += 15;
      }
    }

    this.results.frontend.score += Math.min(reactScore, 50);
    console.log(`✅ Composants React: ${reactScore}/50 points`);

    this.results.frontend.score = Math.min(this.results.frontend.score, 100);
    console.log('');
  }

  displayResults() {
    console.log('═'.repeat(60));
    console.log('📊 RÉSULTATS DES TESTS');
    console.log('═'.repeat(60));

    const sections = [
      { name: 'Fichiers', key: 'files', icon: '📁' },
      { name: 'DNS', key: 'dns', icon: '🌐' },
      { name: 'Backend', key: 'backend', icon: '🔧' },
      { name: 'Email', key: 'email', icon: '📧' },
      { name: 'Frontend', key: 'frontend', icon: '🎨' }
    ];

    let totalScore = 0;
    let maxScore = 0;

    sections.forEach(section => {
      const result = this.results[section.key];
      const color = result.score >= 80 ? '✅' : result.score >= 60 ? '⚠️' : '❌';
      console.log(`${color} ${section.icon} ${section.name}: ${result.score}/100`);
      
      totalScore += result.score;
      maxScore += 100;
    });

    const globalScore = Math.round(totalScore / sections.length);
    console.log('\n' + '═'.repeat(60));
    
    const globalColor = globalScore >= 80 ? '🟢' : globalScore >= 60 ? '🟡' : '🔴';
    console.log(`${globalColor} SCORE GLOBAL: ${globalScore}/100`);

    if (globalScore >= 80) {
      console.log('🎉 EXCELLENT ! Votre site est prêt pour la production !');
    } else if (globalScore >= 60) {
      console.log('👍 BIEN ! Quelques améliorations possibles.');
    } else {
      console.log('🔧 AMÉLIORATIONS NÉCESSAIRES pour optimiser votre site.');
    }

    console.log('\n📋 ACTIONS RECOMMANDÉES:');
    
    if (this.results.dns.score < 80) {
      console.log('1. 🌐 Configurez vos enregistrements DNS (voir GUIDE-DNS-OVH-COMPLET.md)');
    }
    
    if (this.results.email.score < 80) {
      console.log('2. 📧 Configurez SendGrid (voir CONFIGURATION-SENDGRID-NEWSLETTER.md)');
    }
    
    if (this.results.backend.score < 80) {
      console.log('3. 🔧 Démarrez le backend: cd backend && npm run dev');
    }
    
    if (this.results.frontend.score < 80) {
      console.log('4. 🎨 Démarrez le frontend: npm run dev');
    }

    console.log('\n🚀 DÉMARRAGE RAPIDE:');
    console.log('• Tout démarrer: ./start-all.sh');
    console.log('• Backend seul: ./start-backend.sh');  
    console.log('• Frontend seul: ./start-frontend.sh');

    console.log('\n' + '═'.repeat(60));
    console.log('✅ Test terminé - ' + new Date().toLocaleString('fr-FR'));
    console.log('═'.repeat(60));
  }
}

// Exécution du test
const tester = new TestComplet();
tester.runAllTests().catch(console.error);
