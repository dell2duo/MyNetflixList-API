const request = require('supertest');
import { v4 } from 'uuid';

const connection = require('../../src/database/connection');

const testApp = require('express')();
testApp.use(require('../../src/routes'));

describe('Authentication', () => {
  beforeAll( async () => new Promise((resolve, reject) => {
    try {
      connection("contas").insert({
        id: v4(),
        nome: 'Rafael Rocha',
        email: 'rafael@hotmail.com',
        senha: '123456789',
        data_nascimento: '01-09-1998',
      })
      resolve('user created successfully')
    } catch (error) {
      reject(error)
    }
  }))
  afterAll(done => {
    done()
  })
  it('should receive user and password and return a JWT token', (done) => {
    request(testApp).post('/login', { email: 'rafael@hotmail.com', senha: '123456789'}).expect(200, done)
  });
})