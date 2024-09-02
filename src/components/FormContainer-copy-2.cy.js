import React from 'react'
import FormContainer from './FormContainer'

describe('<FormContainer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormContainer />)
  })
})