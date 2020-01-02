import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('sign in')
    )
    expect(component.container).toHaveTextContent(
      'Login'
    )
    expect(component.container).toHaveTextContent(
      'Username:'
    )
    expect(component.container).toHaveTextContent(
      'Password:'
    )
    expect(component.container).toHaveTextContent(
      'login'
    )
    expect(component.container).toHaveTextContent(
      'cancel'
    )
  })
  test('if no user logged, blogs are not rendered', async () => {
    const user = {
      username: 'mattiMe',
      token: '12349876',
      name: 'Matti Meikäläinen'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.togglableContent')
    )

    const blogs = component.container.querySelectorAll('.togglableContent')

    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent(
      'Refactoring'
    )
    expect(component.container).toHaveTextContent(
      'Software Testing Guide'
    )
    expect(component.container).toHaveTextContent(
      'Microservices Guide'
    )
  })
})