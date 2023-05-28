import phc from "@phc/format";

import {randomBytes,scrypt} from 'node:crypto'

import knex from './connection.js'

export function hash(password) {
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

export async function createUser(payload, roles, isProfesor = false) {
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

