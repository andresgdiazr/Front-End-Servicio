import knex from './connection.js'
import { createUser,hash } from './utils.js';

export async function seedDB() {

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

export async function clearDB() {
  await knex("api_tokens").delete();
  await knex("clases").delete();
  await knex("profesores").delete();
  await knex("rol_user").delete();
  await knex("roles").delete();
  await knex("users").delete();
}