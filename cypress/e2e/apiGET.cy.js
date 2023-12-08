describe('Validate the GET API requests for Users and Resources', () => {
  it('validate the GET api request for list of USERS', () => {
    cy.request({
      method: "GET",
      url: "/users?page=2"
    }).as('getUsers')

    cy.get('@getUsers').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`)

      // validate API respsose status code
      expect(status).to.eq(200)

      // validate that the number of users matches the 'per_page' value
      expect(body.data).to.have.lengthOf(body.per_page)

      // validate that each user has the expected keys
      body.data.forEach(user => {
        expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })

      // Validate specific values for the first user in the list
      expect(body.data[0]['id']).to.eq(7)
      expect(body.data[0]['email']).to.eq('michael.lawson@reqres.in')
    })
  })

  it('validate the GET api request for a Single USER', () => {
    cy.request({
      method: "GET",
      url: "/users/2"
    }).as('getUser')

    cy.get('@getUser').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`)

      // validate API respsose status code
      expect(status).to.eq(200)


      // validate structure of the response body
      expect(body).to.have.property('data');
      expect(body.data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')

      // Validate specific values for the first user in the list
      expect(body.data['id']).to.eq(2)
      expect(body.data['email']).to.eq('janet.weaver@reqres.in')
      expect(body.data['first_name']).to.eq('Janet')
      expect(body.data['last_name']).to.eq('Weaver')
      expect(body.data['avatar']).to.eq('https://reqres.in/img/faces/2-image.jpg')

      // Validate the support information
      expect(body).to.have.property('support')
      expect(body.support).to.have.all.keys('url', 'text')
    })
  })

  it('validate the GET api request for a USER Not Found', () => {
    cy.request({
      method: "GET",
      url: "/users/23",
      failOnStatusCode: false
    }).as('getNonExistentUsers')

    cy.get('@getNonExistentUsers').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`)

      // validate API respsose status code is 404
      expect(status).to.eq(404)

      // validate that the rsponse body is an emapty object
      expect(body).to.deep.equal({})
    })
  })

  it('validate the GET api request for list of RESOURCES', () => {
    cy.request({
      method: "GET",
      url: "/unknown"
    }).as('getResources')

    cy.get('@getResources').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`)

      // validate API respsose status code
      expect(status).to.eq(200)

      // validate that the number of resoucres matches the 'per_page' value
      expect(body.data).to.have.lengthOf(body.per_page);

      // validate the structure and content of response body
      expect(body.per_page).to.exist.and.to.be.a('number')
      expect(body.total).to.exist.and.to.be.a('number')
      expect(body.total_pages).to.exist.and.to.be.a('number')
      expect(body.data).to.exist.and.to.be.an('array')
      expect(body.support).to.exist.and.to.be.an('object')

      // validate that each resource in data array has these expected keys
      body.data.forEach(user => {
        expect(user).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value')
      })

      // Validate the support object has these keys
      expect(body.support).to.have.all.keys('url', 'text')
    })
  })

  it('validate the GET api request for a Single RESOURCE', () => {
    cy.request({
      method: "GET",
      url: "/unknown/2"
    }).as('getResources')

    cy.get('@getResources').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`);

      // validate API respsose status code
      expect(status).to.eq(200)

      // validate the structure and content of response body
      expect(body.data.id).to.exist.and.to.eq(2)
      expect(body.data.name).to.exist.and.to.eq('fuchsia rose')
      expect(body.data.year).to.exist.and.to.eq(2001)
      expect(body.data.color).to.exist.and.to.eq("#C74375")
      expect(body.data.pantone_value).to.exist.and.to.eq('17-2031')
    })
  })

  it('validate the GET api request for RESOURCE Not Found', () => {
    cy.request({
      method: "GET",
      url: "/unknown/23",
      failOnStatusCode: false
    }).as('getNonExistentResource')

    cy.get('@getNonExistentResource').then(function ({ status, body }) {
      // Log the API response
      cy.log(`API response is: ${JSON.stringify(body)}`)

      // validate API respsose status code is 404
      expect(status).to.eq(404)

      // validate that the response body is an empty object
      expect(body).to.deep.equal({})
    })
  })

  it.only('validate the GET api request with delayed response', () => {
    cy.request({
      method: "GET",
      url: "/users?delay=3"
    }).as('delayedResponse')

    cy.get('@delayedResponse').then(function ({ status, body }) {
      // validate API respsose status code is 200
      expect(status).to.eq(200)

      // validate that the number of users matches the 'per_page' value
      expect(body.data).to.have.lengthOf(body.per_page)
    })
  })
})
