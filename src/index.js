#! /usr/bin/env node
const { program } = require('commander');

const passiveScan = require('./passive-scanning');
const scanning = require('./scanning');
const generateReport = require('./generate-report');

program
  .requiredOption('-z, --zap-host <zapHost>', 'host of ZAP API')
  .requiredOption('-t, --test-system, <testSystem>', 'host of machine to test')
  .option('-f, --full-scan', 'Run full scanning with Active Scanning step');

program.parse(process.argv);

const spider = 'spider';
const ajaxSpider = 'ajaxSpider';
const aScan = 'ascan';

const analyse = async () => {

  const scans = program.fullScan ? [ spider, ajaxSpider, aScan] : [ spider, ajaxSpider];

  for(const scan of scans) {
    console.log(`Starting ${scan} Scan`);
    await scanning(scan, program.zapHost, program.testSystem);
    console.log(`${scan} complete`);
  }

  await passiveScan(program.zapHost);

  await generateReport(program.zapHost);
};
analyse();