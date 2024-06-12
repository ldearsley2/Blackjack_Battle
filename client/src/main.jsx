import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Title from './components/Title.jsx'
import Dealer from './components/Dealer.jsx'
import PlayerContainer from './components/PlayerContainer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Title />
    <div className="container-main">
      <Dealer />
      <PlayerContainer />
    </div>
  </React.StrictMode>,
)
