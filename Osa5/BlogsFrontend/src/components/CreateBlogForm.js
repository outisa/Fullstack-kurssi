import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleAddBlog, title, author, url }) => (
  <form onSubmit={handleAddBlog}>
    <div>
      Title:
      <input {...title} reset='' />
    </div>
    <div>
      Author:
      <input {...author} reset='' />
    </div>
    <div>
      Url:
      <input {...url} reset=''/>
    </div>
    <button type="submit">Add</button>
  </form>
)
CreateBlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}
export default CreateBlogForm