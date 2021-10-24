// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../pages/index'

describe('Title', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /都道府県別人口構成/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
