import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect, withRouter } from 'react-router-dom'
import { Container, Table, Form, Button, Menu } from 'semantic-ui-react'

const AppMenu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Menu>
      <Menu.Item link>
        <Link to='/anecdotes' style={padding}>anecdotes</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to='/create-new' style={padding}>create new</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to='/about' style={padding}>about</Link>
      </Menu.Item>
    </Menu>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push("/anecdotes")
    props.setNotification("New anecdote created!");
    setTimeout(() => {
      props.setNotification("");
    }, 10000)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>create a new anecdote</h2>

      <Form.Field>
        <label>Content</label>
        <input placeholder="Content" name='content' value={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input placeholder="Author" name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Ulr for more info</label>
        <input placeholder="Url" name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
      </Form.Field>
      <Button>create</Button>
    </Form>
  )

}

const CreateNewWithHistory = withRouter(CreateNew);

const Anecdote = ({ anecdote }) => {
  return (
    <Container text textAlign="center">{anecdote.content}
      <div>
        Votes: {anecdote.votes}
      </div>
    </Container>
  )
}

const Notification = ({ message }) => {
  if (message === null) return null;
  return (
    <div>
      {message}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Container>
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <AppMenu />
          <Notification message={notification} />
          <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create-new" render={() => <CreateNewWithHistory addNew={addNew} setNotification={setNotification} />} />
          <Route path="/about" render={() => <About />} />
          <Route exact path={"/anecdotes/:id"} render={({ match }) => {
            return <Anecdote anecdote={anectodeById(anecdotes, match.params.id)} />
          }} />
        </Router>
        <Footer />
      </div>
    </Container>
  )
}

const anectodeById = (anecdotes, id) => {
  return anecdotes.find(a => a.id === id);
}

export default App;