import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Refactoring',
    author: 'Martin Fowler',
    url: 'https://refactoring.com/',
    likes: 50,
    user: {
      username: 'mattiMe',
      name: 'Matti Meikäläinen'
    }
  }
  const user = {
    username: 'mattiMe',
    name: 'Matti Meikäläinen'
  }
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}> <div className="testDiv" /> </Blog>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start only title and author are displayed', async () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none ')
    expect(div).toHaveTextContent('Refactoring Martin Fowler')
  })

  test('after clicking the name, all fields are displayed', () => {
    const name = component.container.querySelector('div:nth-child(2)')
    fireEvent.click(name)
    const div1 = component.container.querySelector('.togglableContent')
    expect(div1).toHaveStyle('display: block')

    const div2 = component.container.querySelector('.showAll')
    expect(div2).toHaveTextContent('Refactoring Martin Fowlerhttps://refactoring.com/likes: 50likeAdded by Matti Meikäläinenremove')
  })
  test('after clicking the name again, not all fields are displayed', () => {
    const name = component.container.querySelector('.togglableContent')
    fireEvent.click(name)

    const showAllName = component.container.querySelector('.togglableContent2')
    fireEvent.click(showAllName)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).not.toHaveTextContent('Refactoring Martin Fowlerhttps://refactoring.com/likes: 50likeAdded by Matti Meikäläinenremove')
  })
})