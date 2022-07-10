import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Location from './Components/Location'
import rym from './Images/rym.jpg'

function App() {
const [loanding, setLoanding] = useState(true)

useEffect(() => {
  
},[])
  return (
    <div className="App">
      
        <img className='header__img' src={rym} alt="image Rick and Morty" />
        <Location/>
      
    </div>
  )
}

export default App
