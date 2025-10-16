#!/usr/bin/env node

import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import fs from 'fs';

const log = console.log;

const SITE_URL = 'https://www.ghostremixpack.com';

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🔍 AUDIT WEB COMPLET - GHOST REMIX PACK              ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

async function runAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const spinner = ora('Analyse en cours...').start();

  try {
    const runnerResult = await lighthouse(SITE_URL, options);
    const report = runnerResult.lhr;

    await chrome.kill();

    spinner.succeed('Analyse terminée !\n');

    // Performance
    const performance = report.categories.performance.score * 100;
    const accessibility = report.categories.accessibility.score * 100;
    const bestPractices = report.categories['best-practices'].score * 100;
    const seo = report.categories.seo.score * 100;

    // Core Web Vitals
    const metrics = report.audits;
    const lcp = metrics['largest-contentful-paint']?.numericValue || 0;
    const fid = metrics['max-potential-fid']?.numericValue || 0;
    const cls = metrics['cumulative-layout-shift']?.numericValue || 0;
    const fcp = metrics['first-contentful-paint']?.numericValue || 0;
    const tti = metrics['interactive']?.numericValue || 0;
    const tbt = metrics['total-blocking-time']?.numericValue || 0;
    const speedIndex = metrics['speed-index']?.numericValue || 0;

    // Affichage des résultats
    log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    // Scores généraux
    const scoreTable = new Table({
      head: ['Catégorie', 'Score', 'Statut'],
      colWidths: [25, 10, 15]
    });

    scoreTable.push(
      ['Performance', `${performance.toFixed(0)}/100`, getStatus(performance)],
      ['Accessibilité', `${accessibility.toFixed(0)}/100`, getStatus(accessibility)],
      ['Best Practices', `${bestPractices.toFixed(0)}/100`, getStatus(bestPractices)],
      ['SEO', `${seo.toFixed(0)}/100`, getStatus(seo)]
    );

    log(chalk.bold('📊 SCORES GÉNÉRAUX\n'));
    log(scoreTable.toString());

    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    // Core Web Vitals
    const vitalsTable = new Table({
      head: ['Métrique', 'Valeur', 'Objectif', 'Statut'],
      colWidths: [30, 15, 15, 15]
    });

    vitalsTable.push(
      ['LCP (Largest Contentful Paint)', `${(lcp / 1000).toFixed(2)}s`, '< 2.5s', getVitalStatus(lcp, 2500)],
      ['FID (First Input Delay)', `${fid.toFixed(0)}ms`, '< 100ms', getVitalStatus(fid, 100)],
      ['CLS (Cumulative Layout Shift)', `${cls.toFixed(3)}`, '< 0.1', getVitalStatus(cls, 0.1)],
      ['FCP (First Contentful Paint)', `${(fcp / 1000).toFixed(2)}s`, '< 1.8s', getVitalStatus(fcp, 1800)],
      ['TTI (Time to Interactive)', `${(tti / 1000).toFixed(2)}s`, '< 3.8s', getVitalStatus(tti, 3800)],
      ['TBT (Total Blocking Time)', `${tbt.toFixed(0)}ms`, '< 300ms', getVitalStatus(tbt, 300)],
      ['Speed Index', `${(speedIndex / 1000).toFixed(2)}s`, '< 3.4s', getVitalStatus(speedIndex, 3400)]
    );

    log(chalk.bold('⚡ CORE WEB VITALS\n'));
    log(vitalsTable.toString());

    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    // Opportunités d'amélioration
    const opportunities = report.audits;
    const topOpportunities = [];

    Object.keys(opportunities).forEach(key => {
      const audit = opportunities[key];
      if (audit.score !== null && audit.score < 0.9 && audit.details?.overallSavingsMs) {
        topOpportunities.push({
          title: audit.title,
          savings: audit.details.overallSavingsMs,
          description: audit.description
        });
      }
    });

    topOpportunities.sort((a, b) => b.savings - a.savings);

    if (topOpportunities.length > 0) {
      log(chalk.bold('🎯 TOP OPPORTUNITÉS D\'AMÉLIORATION\n'));
      
      topOpportunities.slice(0, 5).forEach((opp, index) => {
        log(chalk.yellow(`${index + 1}. ${opp.title}`));
        log(chalk.gray(`   Gain potentiel : ${(opp.savings / 1000).toFixed(2)}s`));
        log(chalk.gray(`   ${opp.description.substring(0, 100)}...\n`));
      });
    }

    // Sauvegarder le rapport JSON
    const reportDir = './reports';
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = `${reportDir}/audit-${timestamp}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    log(chalk.green(`\n✅ Rapport sauvegardé : ${reportPath}\n`));

    // Résumé
    log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    log(chalk.bold('📋 RÉSUMÉ\n'));
    log(chalk.white(`Site analysé : ${SITE_URL}`));
    log(chalk.white(`Date : ${new Date().toLocaleString()}`));
    log(chalk.white(`Score global : ${((performance + accessibility + bestPractices + seo) / 4).toFixed(0)}/100\n`));

  } catch (error) {
    spinner.fail('Erreur lors de l\'analyse');
    log(chalk.red.bold('\n❌ Erreur :'), error.message);
    await chrome.kill();
    process.exit(1);
  }
}

function getStatus(score) {
  if (score >= 90) return chalk.green('✅ Excellent');
  if (score >= 75) return chalk.yellow('⚠️  Bon');
  if (score >= 50) return chalk.yellow('⚠️  Moyen');
  return chalk.red('❌ Faible');
}

function getVitalStatus(value, threshold) {
  if (value <= threshold) return chalk.green('✅ Bon');
  return chalk.red('❌ À améliorer');
}

// Lancer l'audit
runAudit();

