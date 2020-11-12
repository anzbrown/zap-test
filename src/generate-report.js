const axios = require('axios');
const fs = require('fs');
const dir = 'reports/';

const getReport = async (zapHost, report, file) => {
  const fileStream = await fs.createWriteStream(file).on('error', err => console.error(err));
  const response = await axios.get(`http://${zapHost}/${report}`, {responseType:"stream"}).catch(err => console.error(err));
  await response.data.pipe(fileStream);
};

module.exports = async zapHost => {
  const ajaxSpiderResults = 'HTML/ajaxSpider/view/results';
  const htmlReport = 'OTHER/core/other/htmlreport/';
  const allAlerts = 'HTML/core/view/alerts/';

  const ajaxSpiderReport = dir + 'spidering-report.html';
  const scanningReport = dir + 'scanning-report.html';
  const alertReport = dir + 'all-alerts.html';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log('Generating Spider Report');
  await getReport(zapHost, ajaxSpiderResults, ajaxSpiderReport);
  console.log('Generating Scanning Report');
  await getReport(zapHost, htmlReport, scanningReport);
  console.log('Generating Alert Report');
  await getReport(zapHost, allAlerts, alertReport);
};