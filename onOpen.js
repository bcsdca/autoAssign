/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
    .createMenu('CEC Auto Task Allocation')
    .addItem('Testing round robin task allocation', 'assignTasksRR')
    .addItem('Testing balance task allocation', 'assignTasksBalance')
    .addToUi();
}
