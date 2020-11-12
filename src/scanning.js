const axios = require('axios');
const {sleep} = require('./utils');

const startScan = async (type, zapHost, testSystem) => {
  const scanParams = {url: `http://${testSystem}`};
  await axios.get(`http://${zapHost}/JSON/${type}/action/scan`, {params: scanParams}).catch(err => console.error(err));
};

const getStatus = async (type, zapHost) =>
  await axios.get(`http://${zapHost}/JSON/${type}/view/status/`).catch(err => console.error(err));

const waitForResults = async (type, zapHost) => {
  let response;
  do {
    response = await getStatus(type, zapHost);
    const statusMessage = isNaN(response.data.status) ? `${type} is: ${response.data.status}` :
      `${type} progress: ${response.data.status}%`;
    console.log(statusMessage);
    await sleep(5000);
  }
  while(response.data.status < 100 || response.data.status.toLowerCase() === 'running');
};
module.exports = async (type, zapHost, testSystem) => {
  await startScan(type, zapHost, testSystem);
  await waitForResults(type, zapHost);
}