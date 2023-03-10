import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  
  const hook = () => {
    
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log("promise fulfilled")
        setNotes(response.data)
      });
      
  }

  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notes.map(note => 
            <Note key={note.id} note={note} />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
