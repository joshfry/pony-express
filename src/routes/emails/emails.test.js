const app = require('../../server')
const supertest = require('supertest')
const request = supertest(app)
const emailsFixture = require('./emails.test.fixture')

/*
  TODO
  - emailsFixture is mutated and each test does not get a clean instance of fixture data
*/

describe('emails', () => {
  /*
    READ
  */
  it('GET emails', async done => {
    const res = await request.get('/emails')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(emailsFixture)
    done()
  })

  it('GET emails/:id', async done => {
    const res = await request.get('/emails/1')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(emailsFixture[0])
    done()
  })

  it('GET emails/404', async done => {
    const res = await request.get('/emails/404')
    expect(res.status).toBe(404)
    done()
  })

  /*
    CREATE
  */
  it('POST emails', async done => {
    const reqBodyFixture = { ...emailsFixture[0], id: null }
    const res = await request.post('/emails').send(reqBodyFixture)
    expect(res.status).toBe(201)
    expect(res.body.subject).toBe(reqBodyFixture.subject)
    expect(res.body.body).toBe(reqBodyFixture.body)
    expect(res.body.id).not.toBeNull()
    done()
  })

  /*
    UPDATE
  */
  it('PATCH emails/:id', async done => {
    const reqBodyFixture = { subject: 'UPDATED' }
    const res = await request.patch('/emails/2').send(reqBodyFixture)
    expect(res.status).toBe(200)
    expect(res.body.subject).toBe(reqBodyFixture.subject)
    done()
  })

  /*
    DELETE
  */
  it('DELETE emails/:id', async done => {
    const res = await request.delete('/emails/1')
    const deletedEmail = emailsFixture.find(email => email.id === '1')
    expect(res.status).toBe(204)
    expect(deletedEmail).toBeUndefined()
    done()
  })
})
