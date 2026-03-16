/**
 * CMSS Smart SMS - Database Initialization Script
 * 
 * RUN THIS FUNCTION ONCE: setupDatabase()
 * It will create all necessary sheets and headers in your Google Spreadsheet.
 */

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sheets = {
    "Students": ["StudentID", "FirstName", "LastName", "DOB", "Gender", "ClassID", "AdmissionDate", "ParentID", "Address", "ContactNumber", "Status"],
    "Parents": ["ParentID", "FatherName", "MotherName", "Occupation", "Email", "Phone", "CNIC"],
    "Teachers": ["TeacherID", "Name", "Email", "Phone", "Specialization", "JoiningDate", "Salary", "Status"],
    "Classes": ["ClassID", "ClassName", "Section", "TeacherID"],
    "Subjects": ["SubjectID", "SubjectName", "ClassID", "TeacherID"],
    "Attendance": ["AttendanceID", "Date", "StudentID", "Status", "Remarks", "RecordedBy"],
    "Exams": ["ExamID", "ExamName", "Date", "ClassID", "Term"],
    "Marks": ["MarkID", "ExamID", "StudentID", "SubjectID", "MarksObtained", "TotalMarks", "Grade", "Comments"],
    "Fees": ["FeeID", "StudentID", "Month", "Year", "AmountDue", "AmountPaid", "PaymentDate", "Status", "ReceiptNo"],
    "HealthRecords": ["RecordID", "StudentID", "Date", "Height", "Weight", "EyeScreening", "DentalScreening", "MUAC", "Notes"],
    "Incidents": ["IncidentID", "Date", "StudentID", "Type", "Description", "ActionTaken", "ReportedBy", "Confidential"],
    "Staff": ["StaffID", "Name", "Role", "Email", "Phone", "ContractType", "JoiningDate"],
    "Timetable": ["TimetableID", "ClassID", "Day", "Period", "SubjectID", "Room"],
    "LibraryBooks": ["BookID", "Title", "Author", "ISBN", "Category", "Status"],
    "LibraryTransactions": ["TransactionID", "BookID", "StudentID", "IssueDate", "DueDate", "ReturnDate", "Status"],
    "Inventory": ["ItemID", "ItemName", "Category", "Quantity", "Condition", "LastMaintenance"],
    "Entrepreneurship": ["ProjectID", "StudentID", "Title", "Budget", "Status", "ProfitLoss"],
    "Research": ["ProjectID", "StudentID", "Title", "ProposalURL", "Status", "PublicationDate"],
    "ActivityLogs": ["LogID", "Timestamp", "User", "Action", "Details"]
  };

  for (let sheetName in sheets) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear();
    }
    sheet.getRange(1, 1, 1, sheets[sheetName].length)
         .setValues([sheets[sheetName]])
         .setFontWeight("bold")
         .setBackground("#E8F5E9");
    sheet.setFrozenRows(1);
  }
  
  // Create Folders in Drive
  setupDriveFolders();
  
  SpreadsheetApp.getUi().alert("Database Setup Complete! All sheets and Drive folders created.");
}

function setupDriveFolders() {
  const rootName = "CMSS_SYSTEM_FILES";
  let rootFolder;
  const folders = DriveApp.getFoldersByName(rootName);
  
  if (folders.hasNext()) {
    rootFolder = folders.next();
  } else {
    rootFolder = DriveApp.createFolder(rootName);
  }
  
  const subFolders = ["Students", "ReportCards", "HealthRecords", "ResearchProjects", "EntrepreneurshipProjects", "Finance", "HR"];
  subFolders.forEach(name => {
    if (!rootFolder.getFoldersByName(name).hasNext()) {
      rootFolder.createFolder(name);
    }
  });
}
