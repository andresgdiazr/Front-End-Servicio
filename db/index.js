import knex from './connection.js'
import { createUser,hash } from './utils.js';


async function createUsers() {
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

async function createMaterias() {

  const materiasNombres = [
    "Castellano",
    "Inglés y Otras Lenguas Extranjeras",
    "Matemáticas",
    "Educación Física",
    "Física",
    "Química",
    "Biología",
    "Ciencias de la Tierra",
    "Geografía Historia y Ciudadanía",
    "Formación para la soberanía nacional",
  ];

  let payload = []

  for (const año of [1, 2, 3, 4, 5]) {
    payload = payload.concat(materiasNombres.map( nombre => ({año,nombre}) ))
  }
  const materias = await knex('materias').insert(payload,'*');

  payload = []


  for (const año of [1, 2, 3, 4, 5]) {
    const soberania = materias.find( m => m.año === año && m.nombre === "Formación para la soberanía nacional" )
    payload = payload.concat([
      {nombre:'Soberania Practica',año,materia_padre_id:soberania.id},
      {nombre:'Soberania Teorica',año,materia_padre_id:soberania.id}

    ])
  }

  await knex('materias').insert(payload);

}
export async function seedDB() {

  await knex("roles").insert([
    { descripcion: "Administrador" },
    { descripcion: "Profesor" },
    { descripcion: "NotAllowed" },
  ]);

  await createUsers()

  await createMaterias()
  
}

export async function clearDB() {

  await knex("calificaciones").delete();
  await knex("evaluaciones").delete();
  await knex("materias").delete();
  await knex("api_tokens").delete();
  await knex("clases").delete();
  await knex("profesores").delete();
  await knex("rol_user").delete();
  await knex("roles").delete();
  await knex("users").delete();
}