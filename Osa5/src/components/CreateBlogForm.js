import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleAddBlog, title, handleTitle, author, handleAuthor, url, handleUrl }) => (
  <form onSubmit={handleAddBlog}>
    <div>
      Title:
      <input
        type="text"
        value={title}
        name="Title"
        onChange={handleTitle}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthor}
      />
    </div>
    <div>
      Url:
      <input
        type="text"
        value={url}
        name="Url"
        onChange={handleUrl}
      />
    </div>
    <button type="submit">Add</button>
  </form>
)
CreateBlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
export default CreateBlogForm