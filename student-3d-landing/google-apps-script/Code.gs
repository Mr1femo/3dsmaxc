/**
 * Google Apps Script backend for student leads.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script, paste this file.
 * 3. Project Settings → Script properties:
 *      SHARED_SECRET = the same value as GOOGLE_SCRIPT_SECRET
 * 4. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the Web App URL into GOOGLE_SCRIPT_URL
 */

var SHEET_NAME = "Leads";
var HEADERS = [
  "Lead ID",
  "Created At",
  "Full Name",
  "Phone",
  "Phone Secondary",
  "Email",
  "Instagram",
  "Governorate",
  "Address",
  "University",
  "Major",
  "Academic Year",
  "Course Interest",
  "Future Course Interests",
  "Other Course Interest",
  "Attendance Preference",
  "Baghdad Side",
  "Marketing Consent",
  "Coupon Code",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "Referrer",
  "Landing Page",
  "User Agent",
  "Status",
];

function doPost(e) {
  try {
    var payload = parseBody_(e);
    var secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET") || "";

    if (!secret || payload.secret !== secret) {
      return json_({ success: false, error: "Unauthorized" });
    }

    var lead = payload.lead || {};
    var required = ["fullName", "phone", "governorate", "address", "university", "major", "academicYear", "courseInterest"];
    for (var i = 0; i < required.length; i++) {
      if (!lead[required[i]]) {
        return json_({ success: false, error: "Missing required fields" });
      }
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(15000);

    try {
      var sheet = getSheet_();
      var duplicate = findDuplicate_(sheet, lead.phone, lead.email);
      if (duplicate) {
        return json_({
          success: true,
          duplicate: true,
          leadId: duplicate.leadId,
        });
      }

      var leadId = nextLeadId_(sheet);
      var couponCode = lead.couponCode || generateCoupon_(leadId);
      var now = new Date();

      sheet.appendRow([
        leadId,
        now,
        lead.fullName || "",
        lead.phone || "",
        lead.phoneSecondary || "",
        lead.email || "",
        lead.instagram || "",
        lead.governorate || "",
        lead.address || "",
        lead.university || "",
        lead.major || "",
        lead.academicYear || "",
        lead.courseInterest || "",
        lead.futureCourseInterests || "",
        lead.otherCourseInterest || "",
        lead.attendancePreference || "",
        lead.baghdadSide || "",
        lead.marketingConsent ? "Yes" : "No",
        couponCode,
        lead.utmSource || "",
        lead.utmMedium || "",
        lead.utmCampaign || "",
        lead.utmContent || "",
        lead.referrer || "",
        lead.landingPage || "",
        lead.userAgent || "",
        "New",
      ]);

      return json_({
        success: true,
        duplicate: false,
        leadId: leadId,
      });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return json_({ success: false, error: String(error) });
  }
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Empty request");
  }
  return JSON.parse(e.postData.contents);
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    return;
  }

  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (existing.indexOf("Governorate") !== -1) return;

  var instagramIdx = existing.indexOf("Instagram");
  if (instagramIdx < 0) {
    sheet.insertColumnAfter(lastCol);
    sheet.getRange(1, lastCol + 1).setValue("Governorate").setFontWeight("bold");
    return;
  }

  sheet.insertColumnAfter(instagramIdx + 1);
  sheet.getRange(1, instagramIdx + 2).setValue("Governorate").setFontWeight("bold");
}

function normalizePhone_(value) {
  return String(value || "").replace(/[^0-9]/g, "");
}

function findDuplicate_(sheet, phone, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var values = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  var phoneKey = normalizePhone_(phone);
  var emailKey = String(email || "").trim().toLowerCase();

  for (var i = 0; i < values.length; i++) {
    var existingPhone = normalizePhone_(values[i][3]);
    var existingEmail = String(values[i][5] || "").trim().toLowerCase();
    var phoneMatch = phoneKey && existingPhone && phoneKey === existingPhone;
    var emailMatch = emailKey && existingEmail && emailKey === existingEmail;
    if (phoneMatch || emailMatch) {
      return { leadId: String(values[i][0] || "") };
    }
  }
  return null;
}

function nextLeadId_(sheet) {
  var year = new Date().getFullYear();
  var count = Math.max(sheet.getLastRow() - 1, 0) + 1;
  var serial = ("0000" + count).slice(-4);
  return "STUDENT-" + year + "-" + serial;
}

function generateCoupon_(leadId) {
  return String(leadId || "KARAZ").replace("STUDENT", "KARAZ");
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
