import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikes, handleRemove }) => {
  const [visible, setVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const usersBlog = blog.user.username === user.username
  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}
      </div>
      <div style ={hideWhenVisible} className="showAll">
        <div onClick={toggleVisibility} className="togglableContent2">
          {blog.title} {blog.author}
        </div>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes: {blog.likes}
        <button onClick={handleLikes}>like</button>
        <p>Added by {blog.user.name}</p>
        {usersBlog ?
          <button onClick={handleRemove}>remove</button> :
          null}
      </div>
    </div>
  )
}

export default Blog