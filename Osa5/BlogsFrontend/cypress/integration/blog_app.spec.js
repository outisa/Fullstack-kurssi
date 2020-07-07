const { findByDisplayValue } = require("@testing-library/react")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Meikäläinen',
      username: 'mattime',
      password: 'tosiSalainen'
    }
    const user2 = {
      name: 'Maija Meikäläinen',
      username: 'maijame',
      password: 'salaisempi'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST',  'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('sign in').click()
    cy.contains('Username:')
    cy.contains('Password:')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('sign in').click()
      cy.get('#username').type('mattime')
      cy.get('#password').type('tosiSalainen')
      cy.get('#login-button').click()

      cy.contains('Matti Meikäläinen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('sign in').click()
      cy.get('#username').type('mattime')
      cy.get('#password').type('tosisallainen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mattime', password: 'tosiSalainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Add a new Blog').click()
      cy.get('#title').type('New Blog')
      cy.get('#author').type('Outi S.')
      cy.get('#url').type('http://www.example.com')
      cy.get('#add-button').click()

      cy.contains('New Blog')
      cy.contains('Outi S.')
    })

    it('A blog can be liked', function() {
      cy.contains('Add a new Blog').click()
      cy.get('#title').type('New Blog')
      cy.get('#author').type('Outi S.')
      cy.get('#url').type('http://www.example.com')
      cy.get('#add-button').click()

      cy.get('.togglableContent').click()
      cy.get('.showAll').should('contain', 'likes: 0')

      cy.get('#like-button').click()
      cy.get('.showAll').should('contain', 'likes: 1')      
    })

    it('Blog can be removed', function() {
      cy.contains('Add a new Blog').click()
      cy.createBlog({ 
        title: 'New Blog',
        author: 'Outi S.',
        url: 'http://www.example.com' 
      })

      cy.get('.togglableContent').should('contain', 'New Blog')
      cy.get('.togglableContent').click()
      cy.get('#remove-button').click()
      
      cy.get('.showAll').should('not.contain', 'New Blog')
    })

    it('Blog can be removed only by its creator', function() {
      cy.contains('Add a new Blog').click()
      cy.createBlog({ 
        title: 'New Blog',
        author: 'Outi S.',
        url: 'http://www.example.com' 
      })

      cy.get('.togglableContent').click()      
      cy.get('#blogTable').should('contain','New Blog')
      cy.get('#remove-button').should('exist')   
      
      cy.get('#logout-button').click()
      cy.login({ username: 'maijame', password: 'salaisempi' })
     
      cy.get('.togglableContent').click()
      cy.contains('New Blog').parent().find('#remove-button')
        .should('not.exist')         

    })

  })

  describe('List is shown correctly', function(){
    beforeEach(function() {
      cy.login({ username: 'mattime', password: 'tosiSalainen' })      
      cy.createBlog({
        title: 'First blog',
        author: 'The Creator',
        url: 'http://www.example.com'        
      })
      cy.createBlog({
        title: 'Second blog',
        author: 'The Creator',
        url: 'http://www.example.com'        
      })
      cy.createBlog({
        title: 'Third blog',
        author: 'The Creator',
        url: 'http://www.example.com'        
      })
            
    })
    it('Blogs are sorted by likes most liked first', function() {
      cy.contains('First blog').click()
      cy.contains('First blog').parent().find('#like-button').as('first')
      cy.get('@first').click()

      cy.contains('Third blog').click()
      cy.contains('Third blog').parent().find('#like-button').as('third') 
      cy.get('@first').click()
      cy.get('@third').click()  
      cy.contains('Second blog').click()
      cy.get('@first').click()
       
      cy.visit('http://localhost:3000')
      cy.get('span').then(blogs => {
        console.log('number of blogs', blogs.length)
        console.log(blogs)
        cy.wrap(blogs[0]).contains('First blog')
        cy.wrap(blogs[2]).contains('Third blog')
        cy.wrap(blogs[4]).contains('Second blog')

      })
      
    })
    
  })
})