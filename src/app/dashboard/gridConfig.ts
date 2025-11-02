export const gridColumns = [
  { id: "id", header: [{ text: "ID" }], width: 100 },
  { id: "name", header: [{ text: "Name" }], width: 200 },
  { id: "age", header: [{ text: "Age" }], width: 100 },
  { id: "col1", header: [{ text: "col 1" }], width: 100 },
  { id: "col2", header: [{ text: "col 2" }], width: 100 },
  { id: "col3", header: [{ text: "col 3" }], width: 100 },
  { id: "col4", header: [{ text: "col 4" }], width: 100 },
  { id: "col5", header: [{ text: "col 5" }], width: 100 },
  { id: "col6", header: [{ text: "col 6" }], width: 100 },
  { id: "col7", header: [{ text: "col 7" }], width: 100 },
  { id: "col8", header: [{ text: "col 8" }], width: 100 },
  { id: "col9", header: [{ text: "col 9" }], width: 100 },
  { id: "col10", header: [{ text: "col 10" }], width: 100 },
  { id: "col11", header: [{ text: "col 11" }], width: 100 },
  { id: "col12", header: [{ text: "col 12" }], width: 100 },
  { id: "col13", header: [{ text: "col 13" }], width: 100 },
  { id: "col14", header: [{ text: "col 14" }], width: 100 },
  { id: "col15", header: [{ text: "col 15" }], width: 100 },
  { id: "col16", header: [{ text: "col 16" }], width: 100 },
  { id: "col17", header: [{ text: "col 17" }], width: 100 },
  { id: "col18", header: [{ text: "col 18" }], width: 100 },
  { id: "col19", header: [{ text: "col 19" }], width: 100 },
  { id: "col20", header: [{ text: "col 20" }], width: 100 },
  { id: "col21", header: [{ text: "col 21" }], width: 100 },
  { id: "col22", header: [{ text: "col 22" }], width: 100 },
  { id: "col23", header: [{ text: "col 23" }], width: 100 },
  { id: "col24", header: [{ text: "col 24" }], width: 100 },
  { id: "col25", header: [{ text: "col 25" }], width: 100 },
  { id: "col26", header: [{ text: "col 26" }], width: 100 },
  { id: "col27", header: [{ text: "col 27" }], width: 100 },
  { id: "col28", header: [{ text: "col 28" }], width: 100 },
  { id: "col29", header: [{ text: "col 29" }], width: 100 },
  { id: "col30", header: [{ text: "col 30" }], width: 100 },
];

// Factory function to create grid row data
function createGridRow(id: number, name: string, age: number) {
  const row: Record<string, string | number> = {
    id,
    name,
    age,
  };

  // Generate col1 through col30
  for (let i = 1; i <= 30; i++) {
    row[`col${i}`] = `value ${i}`;
  }

  return row;
}

// Sample names and ages for grid data
const sampleData = [
  { name: "John Doe", age: 30 },
  { name: "Jane Smith", age: 25 },
  { name: "Sam Johnson", age: 40 },
  { name: "Emily Davis", age: 28 },
  { name: "Michael Brown", age: 35 },
  { name: "Sarah Wilson", age: 32 },
  { name: "David Martinez", age: 45 },
  { name: "Jessica Anderson", age: 27 },
  { name: "Christopher Taylor", age: 38 },
  { name: "Amanda Thomas", age: 31 },
  { name: "Robert Garcia", age: 42 },
  { name: "Jennifer Rodriguez", age: 29 },
  { name: "Matthew Lee", age: 36 },
  { name: "Lisa Walker", age: 33 },
  { name: "Daniel Harris", age: 41 },
  { name: "Nicole Clark", age: 26 },
  { name: "Kevin Lewis", age: 39 },
  { name: "Karen Robinson", age: 34 },
  { name: "Brian Young", age: 43 },
  { name: "Michelle Hall", age: 30 },
  { name: "Steven Allen", age: 37 },
  { name: "Laura King", age: 28 },
  { name: "Kenneth Wright", age: 44 },
  { name: "Rebecca Scott", age: 31 },
  { name: "Patrick Green", age: 46 },
  { name: "Stephanie Adams", age: 29 },
  { name: "Gregory Baker", age: 38 },
  { name: "Angela Nelson", age: 33 },
];


// Generate grid data using the factory function
export const gridData = sampleData.map((data, index) =>
  createGridRow(index + 1, data.name, data.age)
);
