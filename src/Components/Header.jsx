import React from 'react'
import './Header.css'

function Header() {
  return (
   <header  className='navigationBar'>
        <img src='/images/pokemonLogo.png' alt='Pokemon' style={{'height':'50px'}}/>
        <img  className="pokeBall" src='/images/pokeBall.webp' alt = "PokeBall" style={{'height':'50px'}}/>
     </header>
    
  )
}

export default Header
