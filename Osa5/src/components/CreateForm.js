import React from 'react';

const CreateForm = ({ handleAddBlog, title, onChange1, author, onChange2, url, onChange3 }) => (
  <form onSubmit={handleAddBlog}>
    <div>
      Title:
        <input
        type="text"
        value={title}
        name="Title"
        onChange={onChange1}
        />
    </div>
    <div>
      Author:
      <input
      type="text"
      value={author}
      name="Author"
      onChange={onChange2}  
      />
    </div>
    <div>
      Url:
      <input
      type="text"
      value={url}
      name="Url"
      onChange={onChange3}  
      />
    </div>
    <button type="submit">Add new Blog</button>
  </form>
)

export default CreateForm