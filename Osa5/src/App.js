import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';


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
        setBlogs(initialBlogs)
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

  const rows = () => blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
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
        }, 5000);
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage('You are succesfully logged out')
    timeout()
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
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
      setErrorMessage(error.message)
      timeout()
    })
  }

  return (
    <div>
      <Notification message={message} errorMessage={errorMessage}/>
      {user === null ?
        <div>
          <h1>Login</h1>
          <LoginForm
          handleLogin={handleLogin}
          username={username}
          onChange1={({ target }) => setUsername(target.value)}
          password={password}
          onChange2={({ target }) => setPassword(target.value)}/>
        </div>  :
        <div>   
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form> 
          <h2>Create new</h2>
          <CreateForm
          handleAddBlog={handleAddBlog}
          title={title}
          onChange1={({ target }) => setTitle(target.value)}
          author={author}
          onChange2={({ target }) => setAuthor(target.value)}
          url={url}
          onChange3={({ target }) => setUrl(target.value)}
          /> 
          <h1>Blogs</h1>
          <ul>
            { rows() }
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
