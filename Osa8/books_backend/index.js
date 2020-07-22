
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./config')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoUrl = config.MONGODB_URI

const jwt = require('jsonwebtoken')
const Genre = require('./models/genre')

const JWT_SECRET = config.SECRET 

mongoose.set('useFindAndModify', false)
mongoose.connect(mongoUrl, { useNewUrlParser: true } )
  .then(result => {
    console.log('connected to MongoDB', mongoUrl)
  })
  .catch(error => {
    console.log('error by connecting  to MongoDB', error.message)
  })

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }
  type Genre {
    genre: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    genres: [Genre!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({ }).populate('author', { name: 1})
      } else if (args.author && args.genre) {
        const books = await Book.find({genres: {$in: [args.genre] }}).populate('author', { name: 1})
        return books.filter(book => book.author.name === args.author)
      } else if (args.author) {
        const books2 = Book.find({ }).populate('author', { name: 1})
        const filtered = books2.filter(book => book.author.name === args.author)
        return filtered
      }
      return await  Book.find({ genres: {$in: [args.genre] }}).populate('author', { name: 1})
        
    },
    allAuthors: async () => {
      const authors = await Author.find({ }).populate('bookCount')
      return  authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: async () => {
      return await Genre.find({})
    }
  },


  Mutation: {
    addBook: async (root, args, context) => {
      const book = await Book.findOne({ title: args.title })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated!')
      }
      if (book) {
        throw new UserInputError('Book with this title is already added', {
          invalidArgs: args.title,
        })
      }
      const genres = await Genre.find({})
      const genresAlready = genres.map(g => g.genre)
      const genresToAdd = args.genres
      genresToAdd.forEach(genre => {
        if(!genresAlready.includes(genre)) {

          genreToAdd = new Genre({genre: genre})
          console.log(genreToAdd)
          genreToAdd.save()
        }
      });
     
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError('lenght of the author must be at least 5 charackter long')
        }
      }  
      let newBook = new Book({...args, author: author})
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      author.books = author.books.concat(newBook)
      author.save()
      
      newBook =await Book.findOne({ title: args.title }).populate('author', {name:1})
      console.log(newBook)
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return  newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated!')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      const savedAuthor = await author.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
      return savedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      const savedUser = await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs:args,
          })
        })
      return savedUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if( !user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})