import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Title from './components/Title.jsx'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import GameContainer from './components/GameContainer.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Flex flexDirection="column"
       alignItems="center" justifyContent="center" gap="2rem">
        <Title />
        <GameContainer />
      </Flex>
    </ChakraProvider>
  </React.StrictMode>,
)
