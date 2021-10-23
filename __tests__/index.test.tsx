// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import PrefecturesPopulationComposition from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<PrefecturesPopulationComposition />)

    const heading = screen.getByRole('heading', {
      name: /Hello World/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
