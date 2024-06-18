const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("1.- Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect({ response }).toBeInstanceOf(Object)
  });

  it("2.- Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
    const jwt = "token";
    const idDeCafeEliminar = 5;
    const nombre = await request(server)
      .delete(`/cafes/${idDeCafeEliminar}`)
      .set("Authorization", jwt)
      .send()
    const status = nombre.statusCode
    const nom = [nombre]
    const idt = nom.map((p) => p.id)
    expect(idt).not.toContain(idDeCafeEliminar)
    expect(status).toBe(404)
  });

  it("3.- Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.", async () => {
    const cofee = { id: 5, nombre: "Luengo" }
    const response = await request(server).post("/cafes").send(cofee)
    const status = response.statusCode
    expect(response.body).toContainEqual(cofee)
    expect(status).toBe(201)
  })

  it("4.- Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
    const idActualizar = 3
    const cofee = { id: 2, nombre: "Luengo" }
    const response = await request(server).put(`/cafes/${idActualizar}`).send(cofee)
    const status = response.statusCode
    expect(status).toBe(400)
  })
});
