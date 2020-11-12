const axios = require('axios');
const {sleep} = require('./utils');

const getStatus = async zapHost =>
  await axios.get(`http://${zapHost}/JSON/pscan/view/recordsToScan/`).catch(err => console.error(err));

const waitForPassiveScanToFinish = async zapHost => {
  let response;
  do {
    response = await getStatus(zapHost);
    console.log(`Records to passive scan: ${response.data.recordsToScan}`);
    await sleep(5000);
  }
  while(response.data.recordsToScan > 0);
  console.log('Passive Scan complete');
}

module.exports = async zapHost => {
  await waitForPassiveScanToFinish(zapHost);
}