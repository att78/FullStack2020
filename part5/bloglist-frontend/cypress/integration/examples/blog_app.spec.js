

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test31 name',
      username: 'test31',
      password: 'test31'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login is shown', function () {
    cy.contains('Please, fill your login credentials')
  })
})