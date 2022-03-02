import React, { useState, FormEvent } from 'react'
import { BugPriority, IBug } from './IBug'
import { v4 as uuid } from 'uuid'
import BugListTable from './BugListTable'
import './app.css'
const App = () => {
  const [newBugDescription, setNewBugDescription] = useState<string>('')
  const [newBugPriority, setNewBugPriority] = useState<string>('Medium')
  const [bugList, setBugList] = useState<IBug[]>([])

  const addBug = (e: FormEvent) => {
    e.preventDefault()
    const newBug: IBug = {
      id: uuid(),
      description: newBugDescription,
      priority: newBugPriority as BugPriority,
    }
    setBugList([...bugList, newBug])

    setNewBugDescription('')
    setNewBugPriority('Medium')
  }
  const deleteBug = (id: string) => {
    const bugs = bugList.filter((bug) => bug.id !== id)
    setBugList(bugs)
  }
  return (
    <div className='app'>
      <h1>🐞BUG TRACKER</h1>
      <BugListTable
        bugs={bugList}
        onDeleteBug={(id: string) => deleteBug(id)}
      />
      <form className='add-new-bug-form' onSubmit={addBug}>
        <label htmlFor='newBugDescription'>New Bug Description </label>
        <input
          type='text'
          data-testid='newbug-description'
          id='newBugDescription'
          value={newBugDescription}
          onChange={(e) => setNewBugDescription(e.target.value)}
        />
        <label htmlFor='newBugPriority'>new Bug Priority: </label>
        <select
          id='newBugPriority'
          value={newBugPriority}
          onChange={(e) => setNewBugPriority(e.target.value)}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        <button data-testid='add-bug' type='submit'>
          Add New Bug
        </button>
      </form>
    </div>
  )
}

export default App
