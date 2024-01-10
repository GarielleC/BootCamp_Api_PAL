import { useState } from 'react'
import BookListRead from './Books/Lists'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='BooksLists'>
        <h2>Livres à lires</h2> 
          <BookListRead />
        <h2>Livres à acheter</h2>
      </div>
     
    </>
  )
}

export default App
