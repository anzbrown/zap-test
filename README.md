# OWASP ZAP Test Utils

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/anzbrown/zap-test/Node.js%20Build/main?style=for-the-badge)](https://github.com/anzbrown/zap-test/actions?query=workflow%3A%22Node.js+Build%22+branch%3Amain+)
[![npm](https://img.shields.io/npm/v/zap-test-runner?style=for-the-badge)](https://www.npmjs.com/package/zap-test-runner)

<a href="https://www.buymeacoffee.com/adambrown" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

### Configuration
This node project ZAP Test which triggers the scanning and generates the report requires the following parameters:

| Parameter    	| Short form 	| Long form     	| Required 	|
|--------------	|------------	|---------------	|----------	|
| ZAP Host     	| -z         	| --zap-host    	| Yes      	|
| Test Machine 	| -t         	| --test-system 	| Yes      	|
| Scan Type    	| -f         	| --full-scan   	| No      	|

In this E2E test project, the required properties are passed through to `docker-compose` using environment variables
which should be declared in a `.env` file in the root project folder and never checked into source control.

```shell script
# The hostname and port of the Zap container to proxy requests and run analysis through e.g.: zap:9090 if using the docker-compose setup
ZAP_HOST=zapHost:zapPort

# The hostname and post of the test server e.g.: 127.0.0.1:8080 if running locally
HOST=hostname:port

# The account to login to run the E2E tests with
USERNAME=username

# The account password to login to run E2E tests with
PASSWORD=password
```

There are 2 kinds of scans which can be used in this project:
 
 - A quick scan which will run the Spider scan, Passive scan and Report steps.
``` shell script
   zap-test -z ${ZAP_HOST} -t ${HOST}
```

 - A full scan which <b>will</b> also run an Active scan. 
``` shell script
   zap-test -z ${ZAP_HOST} -t ${HOST} -f
```

## Test Analysis
Once the tests complete the ZAP analysis stage kicks in, this consists of the following distinct steps from the recommended 
<b>Explore, Attack, Report</b> pattern:
- ### Traditional Spider Scanning

Traditional Spider Scanning will automatically discover resources/URLs on the website. The spider will visit each URL, identify links and keep track of them.
Any "hidden" resources will be discovered with the Spider scan, this is useful for discovering Information Disclosure. 
We don't want to expose unnecessary information from the server that could aid an attacker. 

- ### AJAX Spider Scanning

The AJAX Spider allows you to crawl modern web applications written in AJAX in far more depth than the traditional Spider.
Use the AJAX Spider if you have web applications written in AJAX.
You should also use the native Traditional Spider as well for complete coverage of a web application e.g. covering HTML comments.

- ### Passive Scanning

Passive Scanning works alongside the Spider Scanning and will analyse all HTTP requests and responses that were sent.
This is useful for catching missing protection like Anti-CSRF, CSP, or CORS headers and will show any cookies not flagged as HttpOnly or Secure.

- ### Active Scanning

Active Scanning is the long-running process which will attempt to actively change data to exploit known vulnerabilities.
Logical vulnerabilities, such as broken access control, will not be found by any active or automated vulnerability scanning.
Manual penetration testing should always be performed in addition to active scanning to find all types of vulnerabilities.

- ### Report Generation

This step will collect all the processed results from each scanner and output to HTML reports available at:

    `zap-reports/scanning-report.html`
  
This is the overall summary of the discovered vulnerabilities.

    `zap-reports/all-alerts.html`
 
This is the more detailed view of all the discovered alerts. 
Most likely all the relevant information will be displayed in the summary report.

    `zap-reports/spidering-report.html`

This is a report of the vulnerabilities discovered in the AJAX Spider scan stage. 
Most likely all the relevant information will be displayed in the summary report.