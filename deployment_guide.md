# CMSS Smart SMS - Deployment & Setup Guide

Follow these steps to deploy the complete system using Google Apps Script and Google Sheets.

## Phase 1: Database Setup
1.  **Create a New Google Sheet**: Go to [sheets.new](https://sheets.new) and name it "CMSS Smart SMS Database".
2.  **Open Apps Script**: Click on **Extensions > Apps Script**.
3.  **Add Setup Code**:
    *   Delete any code in the editor.
    *   Create a new file named `Setup.gs`.
    *   Copy the contents of `gas_setup.gs` from this project and paste it there.
4.  **Run Setup**:
    *   Select the `setupDatabase` function in the toolbar.
    *   Click **Run**.
    *   Authorize the script when prompted.
    *   **Result**: Your Google Sheet will now have 19 tabs with correct headers, and a folder named `CMSS_SYSTEM_FILES` will be created in your Google Drive.

## Phase 2: Backend Logic
1.  **Add Backend Code**:
    *   In the Apps Script editor, create a new file named `Code.gs`.
    *   Copy the contents of `gas_code.gs` and paste it there.
2.  **Add UI Code**:
    *   Create a new **HTML** file named `Index.html`.
    *   Copy the contents of `gas_index.html` and paste it there.

## Phase 3: AI Integration (Optional but Recommended)
1.  **Get Gemini API Key**: Go to [Google AI Studio](https://aistudio.google.com/) and get an API key.
2.  **Set Script Property**:
    *   In Apps Script, go to **Project Settings** (gear icon).
    *   Scroll to **Script Properties**.
    *   Add a property:
        *   Property: `GEMINI_API_KEY`
        *   Value: `YOUR_ACTUAL_API_KEY`

## Phase 4: Deployment
1.  **Deploy as Web App**:
    *   Click **Deploy > New Deployment**.
    *   Select **Web App**.
    *   **Description**: "CMSS SMS Production v1".
    *   **Execute as**: "Me".
    *   **Who has access**: "Anyone" (or "Anyone with Google Account" for better security).
2.  **Authorize**: Click **Deploy** and grant permissions.
3.  **Get URL**: Copy the **Web App URL**. This is your system's link!

## Phase 5: Usage
*   **Admin Dashboard**: Open the Web App URL in any browser.
*   **Mobile Access**: The URL works on mobile browsers for teachers to mark attendance on the go.
*   **Data Management**: You can also edit data directly in the Google Sheet; the app will reflect changes instantly.

---

### Important Notes for Rural Pakistan Deployment:
*   **Offline Mode**: Since data is in Sheets, if internet is down, teachers can record attendance in a physical register and sync it later when online.
*   **Low Bandwidth**: The UI uses Tailwind CDN and minimal JavaScript to ensure it loads quickly even on 3G connections.
*   **Security**: Ensure only authorized staff have "Editor" access to the Google Sheet. Use the Web App for daily operations.
