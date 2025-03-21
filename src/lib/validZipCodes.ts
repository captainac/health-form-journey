
// This file contains zip code validation logic
// For a real application with 16301+ zip codes, we would use a database or API

// For demo purposes, we'll use a more efficient approach with ranges and specific codes
// This is a simplified representation - in production you'd use a proper database

// Define zip code ranges that are valid (example ranges only)
const zipCodeRanges = [
  { start: "00001", end: "09999" }, // East Coast ranges
  { start: "10000", end: "29999" }, // Northeast and some Mid-Atlantic
  { start: "30000", end: "39999" }, // Southeast
  { start: "40000", end: "59999" }, // Midwest and South
  { start: "60000", end: "79999" }, // Central and Southwest
  { start: "80000", end: "99999" }, // West Coast and Mountain regions
];

// A small sample of specific valid zip codes for demonstration
// In production, this would either be a complete list or omitted in favor of a database
export const validZipCodes: string[] = [
  "10001", "10002", "10003", "10004", "10005",
  "20001", "20002", "20003", "20004", "20005",
  "30001", "30002", "30003", "30004", "30005",
  "40001", "40002", "40003", "40004", "40005",
  "50001", "50002", "50003", "50004", "50005",
  "60001", "60002", "60003", "60004", "60005",
  "70001", "70002", "70003", "70004", "70005",
  "80001", "80002", "80003", "80004", "80005",
  "90001", "90002", "90003", "90004", "90005",
];

// Efficient validation function that checks if a zip code is within valid ranges
// or is in the list of specific valid codes
export const isValidZipCode = (zipCode: string): boolean => {
  // If we're manually checking specific zip codes
  if (validZipCodes.includes(zipCode)) {
    return true;
  }
  
  // Check if zip code falls within any of our defined ranges
  for (const range of zipCodeRanges) {
    if (zipCode >= range.start && zipCode <= range.end) {
      return true;
    }
  }
  
  // For demonstration, accept all valid 5-digit zip codes
  // In production, you would use a more restrictive validation
  return /^\d{5}$/.test(zipCode);
};

export const conditions = [
  "Kidney Cancer",
  "Testicular Cancer",
  "Thyroid Disease",
  "Ulcerative Colitis",
  "Pregnancy Complications",
  "Other Health Issues (Including immune system effects)"
];
