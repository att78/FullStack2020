

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

  describe('Login', function () {
    it('succeeds with correct username and password', function () {
      cy.get('#username').type('test31')
      cy.get('#password').type('test31')
      cy.get('#login-button').click()
      cy.contains('logout').click()
    })
    it('fails with wrong username or password', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password. Please try again.')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test31', password: 'test31' })

      cy.createBlog({ title: 'Test title2', author: 'Tester2', url: 'www.test2.com', likes: 0 })
    })

    it('A blog can be created', function () {
      cy.contains('add a new blog').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('new blog author')
      cy.get('#url').type('www.blogurl.com')
      cy.contains('add new blog').click()
      cy.contains('A new blog was added.')

    })


    it('A blog can be liked', function () {
      cy.contains('show/hide').click()
      cy.contains('0 likes')
      cy.contains('like').click()
      cy.contains('1 likes')
    })


    it('A blog can be removed', function () {
      cy.contains('Test title2')
      cy.contains('show/hide').click()
      cy.contains('delete').click()
      cy.contains('Test title2').should('not.exist')
      cy.contains('A blog was removed successfully.')
    })




  })


})

