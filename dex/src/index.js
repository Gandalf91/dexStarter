import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { configureChains, WagmiConfig, createClient } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { chains, provider } = configureChains(
  [mainnet, polygon],

  [
    alchemyProvider({ apiKey: '1z7tCreLbEWcecqfmN2YN2loUOL8AYJ6' }),
    publicProvider(),
  ]
)

const client = createClient({
  autoConnect: true,
  provider,

  connectors: [new InjectedConnector({ chains })],
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
)
