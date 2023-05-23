import knexconfig from "knex";
import phc from "@phc/format";

import { scrypt, randomBytes } from "node:crypto";

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

async function clearDB() {
  await knex("api_tokens").delete();
  await knex("clases").delete();
  await knex("profesores").delete();
  await knex("rol_user").delete();
  await knex("roles").delete();
  await knex("users").delete();
}

function hash(password) {
  return new Promise((resolve, reject) => {
    randomBytes(16, (err, salt) => {
      if (err) {
        reject(err);
      }
      scrypt(
        password,
        salt,
        64,
        {
          blockSize: 8,
          cost: 16384,
          parallelization: 1,
          maxmem: 32 * 1024 * 1024,
        },
        (err, hash) => {
          if (err) {
            reject(err);
          }
          const passwordHashed = phc.serialize({
            id: "scrypt",
            params: {
              n: 16384,
              r: 8,
              p: 1,
            },
            salt,
            hash: hash,
          });
          resolve(passwordHashed);
        }
      );
    });
  });
}

async function createUser(payload, roles, isProfesor = false) {
  const user = await knex("users")
    .insert(payload, "*")
    .then((response) => response[0]);

  if (isProfesor) {
    await knex("profesores").insert({
      user_id: user.id,
    });
  }

  for (const rolDescription of roles) {
    const rol = await knex("roles")
      .where({ descripcion: rolDescription })
      .first();
    if (!rol) {
      throw Error("Trying to create a user with a nonexistent role");
    }

    await knex("rol_user").insert({
      user_id: user.id,
      rol_id: rol.id,
    });
  }

  return user;
}

async function seedDB() {


  await knex("roles").insert([
    { descripcion: "Administrador" },
    { descripcion: "Profesor" },
    { descripcion: "NotAllowed" },
  ]);

  await createUser(
    {
      email: "admin@gmail.com",
      nombre: "Jhon",
      apellido: "Doe",
      password: await hash("admin-ps"),
      can_login: true,
      cedula: "111",
    },
    ["Administrador"]
  );


  await createUser(
    {
      email: "profe@gmail.com",
      nombre: "Carlos",
      apellido: "Duran",
      password: await hash("profe-ps"),
      can_login: true,
      cedula: "222",
    },
    ["Profesor"],
    true
  );

  await createUser(
    {
      email: "cant@gmail.com",
      nombre: "Beatrice",
      apellido: "Jobs",
      password: await hash("cant-ps"),
      can_login: false,
      cedula: "333",
    },
    ["Profesor"],
    true
  );



  
}

async function main() {
  await clearDB();
  await seedDB();
  knex.destroy();
}

main();
