import React from 'react'
import Message from './Message'

describe('<Message />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Message />)
  })
})