const Pool = require("pg").Pool;

const pool = new Pool({
  user: "docker",
  password: "123456",
  database: "docker",
  host: "db",
});

module.exports = pool;
