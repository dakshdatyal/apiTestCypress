describe('Validate the POST API request to create user, register and login', () => {
    it('validate the POST request for creating a new user', () => {
        // Define payload for creating a user
        const userPayload = {
            "name": "morpheus",
            "job": "leader"
        }

        cy.request({
            method: "POST",
            url: "/users",
            body: userPayload
        }).as('createUser')

        cy.get('@createUser').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 201
            expect(status).to.eq(201)

            // validate that the response matches the payload
            expect(body.name).to.deep.equal(userPayload.name)
            expect(body.job).to.deep.equal(userPayload.job)

            // validate the structure and content of the response body
            expect(body).to.have.property('id').and.to.be.a('string')
            expect(body).to.have.property('createdAt').and.to.match(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
        })
    })

    it('validate the POST request for Successful Registration', () => {
        // Define payload for successful registration
        const registrationPayload = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }

        cy.request({
            method: "POST",
            url: "/register",
            body: registrationPayload
        }).as('registerSuccess')

        cy.get('@registerSuccess').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 200
            expect(status).to.eq(200)

            // validate the structure and content of the response body
            expect(body).to.have.property('id').and.to.be.a('number')
            expect(body).to.have.property('token').and.to.be.a('string')
        })
    })

    it('validate the POST request for Unsuccessful Registration', () => {
        // Define payload for unsuccessful registration
        const unsuccessfulRegistrationPayload = {
            "email": "sydney@fife"
        }

        cy.request({
            method: "POST",
            url: "/register",
            body: unsuccessfulRegistrationPayload,
            failOnStatusCode: false
        }).as('unsuccessefulRegister')

        cy.get('@unsuccessefulRegister').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 400
            expect(status).to.eq(400)

            // validate the structure and content of the response body
            expect(body).to.have.property('error').and.equal('Missing password')
        })
    })

    it('validate the POST request for Successful Login', () => {
        // Define payload for successful login
        const loginPayload = {
            "email": "eve.holt@reqres.in",
            "password": "picityslickastol"
        }

        cy.request({
            method: "POST",
            url: "/login",
            body: loginPayload
        }).as('loginSuccess')

        cy.get('@loginSuccess').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 200
            expect(status).to.eq(200)

            // validate the structure and content of the response body
            expect(body).to.have.property('token').and.to.be.a('string')
        })
    })

    it('validate the POST request for Unsuccessful Login', () => {
        // Define payload for unsuccessful login
        const unsuccessfulLoginPayload = {
            "email": "peter@klaven"
        }

        cy.request({
            method: "POST",
            url: "/login",
            body: unsuccessfulLoginPayload,
            failOnStatusCode: false
        }).as('unsuccessefulLogin')

        cy.get('@unsuccessefulLogin').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 400
            expect(status).to.eq(400)

            // validate the structure and content of the response body
            expect(body).to.have.property('error').and.equal('Missing password')
        })
    })
})
