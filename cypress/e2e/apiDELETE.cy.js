

describe('Validate the DELETE API request to delete user', () => {

    it('validate the Delete request to delete a user', () => {
        
        cy.request({
            method: "DELETE",
            url: "/users/2",
        }).as('deleteUser')

        cy.get('@deleteUser').then(function ({ status, body }) {
            // Log the API response
            cy.log(`API response is: ${JSON.stringify(body)}`)

            // validate API respsose status code is 200
            expect(status).to.eq(204)

            // validate that the repsonse body is empty
            expect(body).to.eq('')

        })
    })
})