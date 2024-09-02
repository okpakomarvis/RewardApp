import React from 'react'
import CountdownTimer from './countDown'

describe('<CountdownTimer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CountdownTimer />)
  })
})