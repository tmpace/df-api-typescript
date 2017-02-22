const chai = require('chai')
const axios = require('axios')

const expect = chai.expect

describe('Users', () => {
  describe('GET', () => {
    let result;

    before((done) => {
      axios.get('http://localhost:3000/users').then(res => {
        result = res
        done()
      })
    })

    it('Should retrurn proper JSON', () => {
      expect(result.data).to.be.json
    })

    it('Should return an array of users', () => {
      expect(result.data).to.be.a('array')
    })

    it('Should return a status of 200', () => {
      expect(result.status).to.equal(200)
    })

    it('Should contain a User object with the correct keys', () => {
      const user = result.data[0]
      expect(user).to.have.property('email').that.is.a('string')
      expect(user).to.have.property('password').that.is.a('string')
      expect(user).to.have.property('firstName').that.is.a('string')
      expect(user).to.have.property('lastName').that.is.a('string')
      expect(user).to.have.property('phoneNumber').that.is.a('string')
      expect(user).to.have.property('planID').that.is.a('string')
      expect(user).to.have.property('isAdmin').that.is.a('boolean')
    })
  })
})
