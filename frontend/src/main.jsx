import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './Context/ChatProvider.jsx'
// import { Provider } from './components/ui/provider'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ChatProvider>
  
  <ChakraProvider>
  
    <App />
 
  </ChakraProvider>
  </ChatProvider>,
  </BrowserRouter>
  
)
