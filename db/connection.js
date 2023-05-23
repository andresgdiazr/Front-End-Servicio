import knexconfig from "knex";

const knex = knexconfig({
  client: "pg",
  // this should be obtained from enviroment
  connection: {
    database: "sistema_colegio",
    port: 5432,
    password: "R97aa*@oBXr5",
    user: "postgres",
  },
});


export default knex
