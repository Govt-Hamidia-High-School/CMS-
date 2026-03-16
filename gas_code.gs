/**
 * CMSS Smart SMS - Main Backend Logic
 * 
 * This script handles all CRUD operations and API endpoints.
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('CMSS Smart SMS')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Generic CRUD Functions
 */
function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  return values.map(row => {
    let obj = {};
    headers.forEach((header, i) => obj[header] = row[i]);
    return obj;
  });
}

function addRecord(sheetName, data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => data[header] || "");
  
  // Auto-generate ID if missing
  if (!data[headers[0]]) {
    const id = generateUniqueId(sheetName);
    newRow[0] = id;
  }
  
  sheet.appendRow(newRow);
  logActivity("Create", `Added record to ${sheetName}`);
  return { success: true, id: newRow[0] };
}

function updateRecord(sheetName, id, data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIndex = 0; // Assuming ID is always first column
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][idIndex] == id) {
      headers.forEach((header, j) => {
        if (data[header] !== undefined) {
          sheet.getRange(i + 1, j + 1).setValue(data[header]);
        }
      });
      logActivity("Update", `Updated record ${id} in ${sheetName}`);
      return { success: true };
    }
  }
  return { success: false, message: "Record not found" };
}

/**
 * Module Specific Functions
 */

// 1. Student Admission
function admitStudent(studentData, parentData) {
  const parentId = addRecord("Parents", parentData).id;
  studentData.ParentID = parentId;
  studentData.Status = "Active";
  studentData.AdmissionDate = new Date();
  return addRecord("Students", studentData);
}

// 2. Attendance
function bulkMarkAttendance(attendanceList) {
  attendanceList.forEach(record => {
    record.Date = new Date();
    addRecord("Attendance", record);
  });
  return { success: true };
}

// 4. Examination & Report Cards
function generateReportCard(studentId, examId) {
  const marks = getSheetData("Marks").filter(m => m.StudentID == studentId && m.ExamID == examId);
  const student = getSheetData("Students").find(s => s.StudentID == studentId);
  
  // Here you would typically generate a PDF using a template
  // For now, return the data
  return { student, marks };
}

// 5. Fee Management
function collectFee(paymentData) {
  paymentData.PaymentDate = new Date();
  paymentData.ReceiptNo = "REC-" + new Date().getTime();
  return addRecord("Fees", paymentData);
}

// 12. Communication
function sendParentNotification(parentId, message) {
  const parent = getSheetData("Parents").find(p => p.ParentID == parentId);
  if (parent && parent.Email) {
    MailApp.sendEmail(parent.Email, "CMSS School Notification", message);
  }
  return { success: true };
}

/**
 * AI Integration (Gemini API)
 * Note: This requires the Gemini API Key to be set in Script Properties
 */
function callGemini(prompt) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  return json.candidates[0].content.parts[0].text;
}

/**
 * Utilities
 */
function generateUniqueId(prefix) {
  return prefix.substring(0, 3).toUpperCase() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function logActivity(action, details) {
  const user = Session.getActiveUser().getEmail();
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("ActivityLogs");
  sheet.appendRow([generateUniqueId("LOG"), new Date(), user, action, details]);
}
