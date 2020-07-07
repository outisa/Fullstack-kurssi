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
    <div style={blogStyle} id='blogTable'>
      <div onClick={toggleVisibility} style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}
      </div>
      <div style ={hideWhenVisible} className="showAll">
        <div onClick={toggleVisibility} className="togglableContent2">
          <span>{blog.title} </span><span>{blog.author}</span>
        </div>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes: {blog.likes}
        <button onClick={handleLikes} id='like-button' >like</button>
        <p>Added by {blog.user.name}</p>
        {usersBlog ?
          <button onClick={handleRemove} id='remove-button' >remove</button> :
          null}
      </div>
    </div>
  )
}

export default Blog