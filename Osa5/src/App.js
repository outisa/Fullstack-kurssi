import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        console.log('promise fulfilled')
        initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(initialBlogs)
        console.log(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const rows = () =>
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user}
        handleLikes={() => handleLikes(blog.id)}
        handleRemove={() => handleRemove(blog.id)}/>
    )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const timeout = () => {
    setTimeout(() => {
      setMessage('')
      setErrorMessage('')
    }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage('You are succesfully logged out')
    timeout()
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )
  const blogForRef = React.createRef()

  const createBlogForm = () => (
    <Togglable buttonLabel="Add a new Blog" ref={blogForRef}>
      <CreateBlogForm
        handleAddBlog={handleAddBlog}
        title={title}
        handleTitle={({ target }) => setTitle(target.value)}
        author={author}
        handleAuthor={({ target }) => setAuthor(target.value)}          url={url}
        handleUrl={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  )

  const handleLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog)
    const likes = blog.likes +1
    const userId = blog.user.id
    console.log(likes)
    console.log(id)
    const newBlog = {
      user: userId,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updatetBlog = await blogService.update(blog.id, newBlog)
    const updatetBlogs = blogs.map(b => b.id !== updatetBlog.id ? b : updatetBlog)
    updatetBlogs.sort((a, b) => b.likes -a.likes)
    setBlogs(updatetBlogs)
  }

  const handleRemove = id => {
    const blog = blogs.find(b => b.id === id)
    const confirmed = window.confirm(`Are you sure, you want to delete ${blog.title} by ${blog.author}`)
    if (confirmed) {
      console.log('true')
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
    blogForRef.current.toggleVisibility()
    const blogObject = {
      author: author,
      title: title,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setMessage(`A new blog ${title} by ${author} has been added`)
        timeout()
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(error => {
        setErrorMessage(error.message, 'Validation error! Title and url required. Url must be at least 4 and title at least 1 character long')
        timeout()
      })
  }

  return (
    <div>
      <Notification message={message} errorMessage={errorMessage}/>
      {user === null ?
        <div>
          <h1>Login</h1>
          {loginForm()}
        </div> :
        <div>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form>
          <h2>Add new blog</h2>
          {createBlogForm()}

          <h1>Blogs</h1>
          <ul>
            { rows() }
          </ul>
        </div>
      }
    </div>
  )
}

export default App