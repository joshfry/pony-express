import app from '../../server'
import supertest from 'supertest'
import usersFixture from './users.test.fixture'

const request = supertest(app)

describe('users', () => {
  /*
    READ
  */
  it('GET users', async done => {
    const res = await request.get('/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(usersFixture)
    done()
  })

  it('GET users/:id', async done => {
    const res = await request.get('/users/1')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(usersFixture[0])
    done()
  })

  it('GET users/404', async done => {
    const res = await request.get('/users/404')
    expect(res.status).toBe(404)
    done()
  })
})
