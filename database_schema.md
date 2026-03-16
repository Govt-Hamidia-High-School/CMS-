# CMSS Smart School Management System - Database Schema (Google Sheets)

This document outlines the structured tables required in Google Sheets to serve as the database for the CMSS Smart SMS.

## 1. Students Table
| Column Name | Type | Description |
|-------------|------|-------------|
| StudentID | String (PK) | Unique ID (e.g., CMSS-ST-2024-001) |
| FirstName | String | |
| LastName | String | |
| DOB | Date | |
| Gender | Enum | Male, Female, Other |
| ClassID | String (FK) | Reference to Classes table |
| AdmissionDate | Date | |
| ParentID | String (FK) | Reference to Parents table |
| Address | String | |
| ContactNumber | String | |
| Status | Enum | Active, Inactive, Graduated |

## 2. Parents Table
| Column Name | Type | Description |
|-------------|------|-------------|
| ParentID | String (PK) | Unique ID |
| FatherName | String | |
| MotherName | String | |
| Occupation | String | |
| Email | String | |
| Phone | String | |
| CNIC | String | National ID |

## 3. Teachers Table
| Column Name | Type | Description |
|-------------|------|-------------|
| TeacherID | String (PK) | Unique ID |
| Name | String | |
| Email | String | |
| Phone | String | |
| Specialization | String | |
| JoiningDate | Date | |
| Salary | Number | |

## 4. Attendance Table
| Column Name | Type | Description |
|-------------|------|-------------|
| AttendanceID | String (PK) | |
| Date | Date | |
| StudentID | String (FK) | |
| Status | Enum | Present, Absent, Late, Leave |
| Remarks | String | |

## 5. Fees Table
| Column Name | Type | Description |
|-------------|------|-------------|
| FeeID | String (PK) | |
| StudentID | String (FK) | |
| Month | String | |
| AmountDue | Number | |
| AmountPaid | Number | |
| PaymentDate | Date | |
| Status | Enum | Paid, Pending, Partial |

## 6. Exams Table
| Column Name | Type | Description |
|-------------|------|-------------|
| ExamID | String (PK) | |
| ExamName | String | Mid-term, Final, Monthly Test |
| Date | Date | |
| ClassID | String (FK) | |

## 7. Marks Table
| Column Name | Type | Description |
|-------------|------|-------------|
| MarkID | String (PK) | |
| ExamID | String (FK) | |
| StudentID | String (FK) | |
| SubjectID | String (FK) | |
| MarksObtained | Number | |
| TotalMarks | Number | |

## 8. HealthRecords Table
| Column Name | Type | Description |
|-------------|------|-------------|
| RecordID | String (PK) | |
| StudentID | String (FK) | |
| Date | Date | |
| Height | Number | |
| Weight | Number | |
| EyeScreening | String | |
| DentalScreening | String | |
| MUAC | Number | Mid-Upper Arm Circumference |

## 9. Inventory Table
| Column Name | Type | Description |
|-------------|------|-------------|
| ItemID | String (PK) | |
| ItemName | String | |
| Category | Enum | Furniture, Equipment, Stationery |
| Quantity | Number | |
| Condition | String | |

## 10. LibraryBooks Table
| Column Name | Type | Description |
|-------------|------|-------------|
| BookID | String (PK) | |
| Title | String | |
| Author | String | |
| ISBN | String | |
| Status | Enum | Available, Issued |
