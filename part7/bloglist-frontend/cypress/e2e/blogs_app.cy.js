describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Admin Root',
      username: 'admin',
      password: 'pass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#input-login-username').should('exist')
    cy.get('#input-login-password').should('exist')
    cy.get('#input-login-submit').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-login-username').type('admin')
      cy.get('#input-login-password').type('pass')
      cy.get('#input-login-submit').click()

      cy.contains('Admin Root logged in')
    })

    it('fails with invalid username or password', function () {
      cy.get('#input-login-username').type('martin')
      cy.get('#input-login-password').type('wrong')
      cy.get('#input-login-submit').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'pass' })
      cy.contains('Admin Root logged in')
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#input-blog-title').type('title new blog test')
      cy.get('#input-blog-author').type('author new bloog test')
      cy.get('#input-blog-url').type('https://www.newblog.test')

      cy.get('#input-blog-create').click()
      cy.contains('title new blog test author new bloog test')
    })

    describe('When blog is added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'command added blog',
          author: 'author test',
          url: 'https://www.test.com'
        })
      })

      it('it can be liked', function () {
        cy.get('.blog-view').click()
        cy.get('.blog-likes').then(($currentLikes) => {
          const likesCount = Number($currentLikes.text())
          cy.get('.blog-like').click()
          cy.get('.blog-likes').contains(likesCount + 1)
        })
      })

      it('it can be removed by the user who created the blog', function () {
        cy.get('.blog-view').click()
        cy.contains('command added blog').should('exist')
        cy.get('.blog-remove').click()
        cy.contains('command added blog').should('not.exist')
      })

      it('remove button is not visible for users who are not creators of the blog', function () {
        cy.contains('logout').click()
        const secondUser = {
          name: 'Other User',
          username: 'other',
          password: 'user'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)

        cy.login({ username: 'other', password: 'user' })
        cy.contains('Other User logged in')

        cy.get('.blog-view').click()
        cy.contains('command added blog').should('exist')
        cy.get('.blog-username').should('not.contain', secondUser.username)
        cy.contains('command added blog').should('exist')
        cy.contains('remove').should('not.exist')
      })
    })

    describe('When multiple blogs are added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog with the least amount of likes',
          author: 'author test1',
          url: 'https://www.test1.com'
        })
        cy.createBlog({
          title: 'blog with the most likes',
          author: 'author test2',
          url: 'https://www.test2.com'
        })
        cy.createBlog({
          title: 'blog with the second most likes',
          author: 'author test3',
          url: 'https://www.test3.com'
        })
      })

      it('blogs are sorted according to the number of likes with the most liked blog being first', function () {
        cy.contains('blog with the most likes').parent().find('.blog-view').click()
        cy.contains('blog with the most likes')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
          .wait(500)

        // changing selection to author because the pop up notification of adding a new blog causes contains to find two elements
        cy.contains('author test2')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
          .wait(500)
        cy.contains('author test2')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
          .wait(500)
        cy.contains('author test2')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
          .wait(500)
        cy.contains('author test2')
          .parent()
          .find('.blog-likes')
          .should('contain', '4')

        cy.contains('blog with the second most likes')
          .parent()
          .find('.blog-view')
          .click()
        cy.contains('blog with the second most likes')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
          .wait(500)
        cy.contains('author test3')
          .parent()
          .find('.blog-like')
          .should('contain', 'like')
          .click()
        cy.contains('author test3')
          .parent()
          .find('.blog-likes')
          .should('contain', '2')

        cy.get('.blog-style').eq(0).should('contain', 'blog with the most likes')
        cy.get('.blog-style')
          .eq(1)
          .should('contain', 'blog with the second most likes')
        cy.get('.blog-style')
          .eq(2)
          .should('contain', 'blog with the least amount of likes')
      })
    })
  })
})
