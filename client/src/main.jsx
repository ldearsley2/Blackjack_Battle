import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Title from './components/Title.jsx'
import Dealer from './components/Dealer.jsx'
import PlayerContainer from './components/PlayerContainer.jsx'
import { ChakraProvider, Flex } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Flex flexDirection="column"
       alignItems="center" justifyContent="center" gap="2rem">
        <Title />
        <Dealer />
        <PlayerContainer />
      </Flex>
    </ChakraProvider>
  </React.StrictMode>,
)
