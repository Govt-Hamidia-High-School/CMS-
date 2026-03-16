/**
 * CMSS Smart SMS - Google Apps Script Backend
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Copy and paste this code.
 * 4. Deploy as a Web App.
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace after creating sheet

function doGet(e) {
  return HtmlService.createHtmlOutput("CMSS API is running.");
}

/**
 * Core Database Functions
 */
function getSheet(name) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
}

function createRecord(sheetName, data) {
  const sheet = getSheet(sheetName);
  const lastRow = sheet.getLastRow();
  const id = generateId(sheetName);
  const rowData = [id, ...data];
  sheet.appendRow(rowData);
  return id;
}

function generateId(prefix) {
  const timestamp = new Date().getTime();
  return `${prefix.substring(0, 3).toUpperCase()}-${timestamp}`;
}

/**
 * Student Management
 */
function addStudent(studentData) {
  // studentData: [firstName, lastName, dob, classId, parentId, ...]
  return createRecord('Students', studentData);
}

function getStudents() {
  const sheet = getSheet('Students');
  return sheet.getDataRange().getValues();
}

/**
 * Attendance
 */
function recordAttendance(date, studentId, status, remarks) {
  return createRecord('Attendance', [date, studentId, status, remarks]);
}

/**
 * Finance
 */
function recordPayment(studentId, month, amount) {
  const date = new Date();
  return createRecord('Fees', [studentId, month, amount, date, 'Paid']);
}

/**
 * AI Integration Helper (to be called from React)
 */
function logAIUsage(user, tool, input) {
  createRecord('AILogs', [user, tool, input, new Date()]);
}

/**
 * Automation Triggers
 */
function dailyAttendanceReminder() {
  // Logic to send email/SMS if attendance is not marked by 10 AM
  console.log("Checking attendance status...");
}

function monthlyFeeReminder() {
  // Logic to identify pending fees and notify parents
  console.log("Sending fee reminders...");
}
