// const gemini = require('gemini');

gemini.suite('quickcomparison', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('.banner-default')
      .capture('plain');
});
