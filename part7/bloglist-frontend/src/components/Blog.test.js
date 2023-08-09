import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlogData = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'https://www.test.com',
  likes: 2,
  user: {
    username: 'TestUsername',
    name: 'TestName',
  },
}

describe('<Blog />', () => {
  let user
  let container
  let mockHandler

  beforeEach(() => {
    user = userEvent.setup()
    mockHandler = jest.fn()
    container = render(
      <Blog blog={testBlogData} user={user} increaseLikes={mockHandler} />,
    ).container
  })

  test('renders title and author but not url or likes', () => {
    const title = container.querySelector('.blog-title')
    expect(title).toHaveTextContent('Test Title')
    expect(title).toBeVisible()

    const author = container.querySelector('.blog-author')
    expect(author).toHaveTextContent('Test Author')
    expect(author).toBeVisible()

    const likes = container.querySelector('.blog-likes')
    expect(likes).toHaveTextContent('2')
    expect(likes).not.toBeVisible()

    const url = container.querySelector('.blog-url')
    expect(url).toHaveTextContent('https://www.test.com')
    expect(url).not.toBeVisible()
  })

  test('clicking the view button shows url and likes', async () => {
    const viewButton = container.querySelector('.blog-view')
    await user.click(viewButton)

    const likes = container.querySelector('.blog-likes')
    expect(likes).toHaveTextContent('2')
    expect(likes).toBeVisible()

    const url = container.querySelector('.blog-url')
    expect(url).toHaveTextContent('https://www.test.com')
    expect(url).toBeVisible()
  })

  test('clicking the like button makes event handler register two clicks', async () => {
    const viewButton = container.querySelector('.blog-view')
    await user.click(viewButton)

    const likeButton = container.querySelector('.blog-like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
