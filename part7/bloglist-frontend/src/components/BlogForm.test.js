import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const testBlogData = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'https://www.test.com',
  likes: 2,
  user: {
    username: 'TestUsername',
    name: 'TestName'
  }
}

describe('<BlogForm />', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockUser = userEvent.setup()
    const mockHandler = jest.fn()
    const container = render(<BlogForm createBlog={mockHandler} />).container

    const inputTitle = container.querySelector('input[name="input-blog-title"]')
    const inputAuthor = container.querySelector('input[name="input-blog-author"]')
    const inputUrl = container.querySelector('input[name="input-blog-url"]')

    await mockUser.type(inputTitle, testBlogData.title)
    await mockUser.type(inputAuthor, testBlogData.author)
    await mockUser.type(inputUrl, testBlogData.url)

    const submitCreateButton = container.querySelector(
      'input[name="input-blog-create"]'
    )
    await mockUser.click(submitCreateButton)

    const { user, likes, ...result } = testBlogData

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual(result)
  })
})
