describe('Validate the PUT and PATH API request to update', () => {

    it('validate the PUT request to update a user entirely', () => {
        /*PUT is used to replace the entire resource with a new representation, 
        meaning that all the fields of the resource are sent in the request body, even if they are not modified*/

        // Define payload for updating a user
        const userPayload = {
            "name": "morpheus",
            "job": "leader",
            "id": 1
        }

        cy.request({
            method: "PUT",
            url: "/users/2",
            body: userPayload
        }).as('updateUserPut')

        cy.get('@updateUserPut').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 200
            expect(status).to.eq(200)

            // validate that the response matches the payload
            expect(body.name).to.deep.equal(userPayload.name)
            expect(body.job).to.deep.equal(userPayload.job)
            expect(body.id).to.deep.equal(userPayload.id)

            // validate the structure and content of the response body
            expect(body).to.have.property('updatedAt').and.to.match(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
        })
    })

    it('validate the PATCH request to update a field of existing resource', () => {
        /*PATCH is used to apply partial updates to a resource, meaning that only the fields that need to be changed are sent in the request body.*/

        // Define payload for updating a field of a user
        const userPayload = {
            "name": "emily",
        }

        cy.request({
            method: "PATCH",
            url: "/users/2",
            body: userPayload
        }).as('updateUserPatch')

        cy.get('@updateUserPatch').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 200
            expect(status).to.eq(200)

            // validate that the response matches the payload
            expect(body.name).to.deep.equal(userPayload.name)

            // validate the structure and content of the response body
            expect(body).to.have.property('updatedAt').and.to.match(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
        })
    })
})