/**
 * Hidden Work quiz, response logger (Google Apps Script web app).
 * Bound to the "Hidden Work Quiz Responses" sheet in dan@dandobos.com's Drive.
 * The quiz POSTs one JSON object per completion; this appends it as a row,
 * auto-adding a column the first time it sees a new field.
 */
const SHEET_ID = '1Qgy6VW23YzWnU_RPI8iJ4EgCqmTP284PxH_7Wy5gTfo';
const TAB = 'Responses';

function doPost(e){
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);                         // serialise concurrent submissions
    try {
      let headers = sh.getLastRow() >= 1
        ? sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0].filter(String)
        : [];
      let changed = headers.length === 0;
      Object.keys(data).forEach(k => { if (headers.indexOf(k) === -1) { headers.push(k); changed = true; } });
      if (changed) sh.getRange(1, 1, 1, headers.length).setValues([headers]);

      const row = headers.map(h => {
        const v = data[h];
        return (v === undefined || v === null) ? '' : (typeof v === 'object' ? JSON.stringify(v) : v);
      });
      sh.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){
  return ContentService.createTextOutput('Hidden Work quiz logger is live');
}
