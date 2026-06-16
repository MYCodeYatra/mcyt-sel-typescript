const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('Custom Reporter: Run complete. Generating JSON report...');
    
    const reportPath = path.resolve(__dirname, '../../logs/custom-report.json');
    
    // Create a simplified payload
    const simplifiedResults = {
      startTime: new Date(results.startTime).toISOString(),
      numTotalTests: results.numTotalTests,
      numPassedTests: results.numPassedTests,
      numFailedTests: results.numFailedTests,
      testSuites: results.testResults.map(suite => ({
        filePath: suite.testFilePath,
        status: suite.numFailingTests > 0 ? 'FAILED' : 'PASSED',
        durationMs: suite.perfStats.end - suite.perfStats.start
      }))
    };

    fs.writeFileSync(reportPath, JSON.stringify(simplifiedResults, null, 2));
    console.log(`Report successfully written to ${reportPath}`);
  }
}

module.exports = CustomReporter;
