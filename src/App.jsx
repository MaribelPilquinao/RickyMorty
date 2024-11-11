import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import Location from './Components/Location';

import rick1 from './Images/rick1.jpg';

function App() {
const [loanding, setLoanding] = useState(true)

useEffect(() => {
  
},[])
  return (
    <div className="App">
      
        <img className='header__img' src={rick1} alt="image Rick and Morty" />
        <Location/>
      
    </div>
  )
}

export default App
