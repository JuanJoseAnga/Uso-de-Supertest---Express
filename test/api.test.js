const request = require('supertest');
const app = require('../database');

describe('MENSAJE: GET', () => {
    it('TEST 01: Respuesta cuando llamo por id', (done) => {
        request(app)
            .get('/users/1011')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('TEST 02: Respuesta cuando llamo por id y no funciona', (done) => {
        request(app)
            .get('/users/nosignal')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('Usuario no encontrado')
            done(); // Aquí usamos .end(done) solo una vez para indicar que la prueba ha finalizado
    });
});


describe("MENSAJE: POST", () => {
    it('TEST 03: usuario creado', (done) => {
        const data = {
            username: 'admin',
            password: 'admin01'
        };
        request(app)
            .post('/users')
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201, done);
    });

    it('TEST 04: usuario no creado', (done) => {
        const data = {};
        request(app)
            .post('/users')
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('Usuario no creado')
            done(); // Aquí usamos .end(done) solo una vez para indicar que la prueba ha finalizado
    });
});