import React from 'react'
import CountdownTimer from './countDown'

describe('<CountdownTimer />', () => {
  it('renders', () => {
    cy.mount(<CountdownTimer />)
  })
})