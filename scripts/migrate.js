const db = require("../src/db");

(async () => {
  try {
    const isTable = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema LIKE 'public' AND table_type LIKE 'BASE TABLE' AND  table_name='book')"
    );
    console.log(isTable, "tableValue");
    if (isTable?.result?.rows[0]?.exists) {
      await db.query("DROP TABLE book");
    }
    await db.query(
      "CREATE TABLE book( id SERIAL PRIMARY KEY, name TEXT NOT NULL,author TEXT NOT NULL)"
    );
    console.log("Created book table!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
