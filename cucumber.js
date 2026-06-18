module.exports = {
  default: {
    paths: ["tests/bdd/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["tests/bdd/steps/**/*.ts", "tests/bdd/support/**/*.ts"],
    format: [
      "summary",
      "progress-bar",
      "html:reports/cucumber-report.html"
    ],
    formatOptions: {
      snippetInterface: "async-await"
    },
    publishQuiet: true
  }
};
