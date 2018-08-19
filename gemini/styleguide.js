gemini.suite('type', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="typeCnt"]')
      .capture('plain');
});
gemini.suite('buttons', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="buttonsCnt"]')
      .capture('plain');
});
gemini.suite('dropdowns', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="dropdownsCnt"]')
      .capture('plain');
});
gemini.suite('forms', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="formsCnt"]')
      .capture('plain');
});
gemini.suite('tables', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="tablesCnt"]')
      .capture('plain');
});
gemini.suite('grid', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="gridCnt"]')
      .capture('plain');
});
gemini.suite('cards', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="cardsCnt"]')
      .capture('plain');
});
gemini.suite('misc', (suite) => {
  suite.setUrl('/')
      .setCaptureElements('[data-test="miscCnt"]')
      .capture('plain');
});
