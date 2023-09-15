const fs = require("fs");

// Format date to YYYYMMDD
const formatDate = (date) => {
  const dateParts = date?.split("/");
  let year, month, day;
  if (dateParts) {
    if (dateParts[2]) {
      year = dateParts[2];
    }
    if (dateParts[1]) {
      month = dateParts[1].padStart(2, "0");
    }
    if (dateParts[0]) {
      day = dateParts[0].padStart(2, "0");
    }
    return year + month + day;
  }
  return "";
};

// Read the CSV file
const csvData = fs.readFileSync("TUSS_19_1.csv", "utf8");

// Split the CSV data into rows
const rows = csvData.split("\n");

// Create a SQL insert statement for each row
const sqlInsertStatements = [];
for (const row of rows) {
  const columns = row.split(";");
  columns[2] = columns[2] != "" ? formatDate(columns[2]) : "NULL";
  columns[3] = columns[3] != "" ? formatDate(columns[3]) : "NULL";
  columns[4] = columns[4] != "" ? formatDate(columns[4]) : "NULL";

  // Construct the SQL insert statement
  const sqlInsertStatement = `INSERT INTO table_name (column1, column2, column3, column4, column5) VALUES (${columns[0]}, "${columns[1]}", "${columns[2]}", "${columns[3]}", "${columns[4]}");`;

  // Add the SQL insert statement to the list
  sqlInsertStatements.push(sqlInsertStatement);
}

// Write the SQL insert statements to a file
fs.writeFileSync("tuss_19_1.sql", sqlInsertStatements.join("\n"));
