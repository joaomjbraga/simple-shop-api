import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  await knex("client").insert([
    { name: "Marcos Silva" },
    { name: "Ana Paula Souza" },
    { name: "João Pedro Santos" },
    { name: "Fernanda Lima" },
    { name: "Carlos Eduardo Rocha" },
    { name: "Juliana Alves" },
    { name: "Ricardo Nogueira" },
    { name: "Patrícia Gomes" },
    { name: "Bruno Ribeiro" },
    { name: "Camila Ferreira" },
    { name: "Diego Martins" },
    { name: "Larissa Costa" },
    { name: "Rafael Azevedo" },
    { name: "Beatriz Pacheco" },
    { name: "Lucas Farias" },
    { name: "Mariana Teixeira" },
    { name: "Felipe Barros" },
    { name: "Renata Moreira" },
    { name: "Thiago Mendonça" },
    { name: "Natália Cunha" }
  ]);
}
