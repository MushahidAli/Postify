//Dependencies
import React from 'react'

//Components
import Logon from './components/Logon'
import Home from './components/Home'

//Assets
import './App.css'

function App() {

  var login = localStorage.getItem("login");

  return (
    <>
      { login ? <Home /> : <Logon /> }
    </>
  )
}

export default App