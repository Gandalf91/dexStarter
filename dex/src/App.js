import './App.css'
import Header from './components/Header'
import Swap from './components/Swap'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'
import { useConnect, useAccount } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [seeds, setSeeds] = useState('...')
  const [balance, setBalance] = useState('...')
  const [dollars, setDollars] = useState('...')
  const [rewards, setRewards] = useState('...')
  const { address, isConnected } = useAccount()

  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })

  async function getNameAndBalance() {
    const res = await axios.get(`http://localhost:3001/getNameAndBalance`, {
      params: { userAddress: address },
    })

    const response = res.data
    console.log(response)

    setBalance(String(response.balance))
    setDollars(String(response.dollars))
    setSeeds(response.seeds)
    setRewards(response.rewards)
  }

  useEffect(() => {
    if (!isConnected) return
    getNameAndBalance()
  }, [isConnected])

  return (
    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route
            path="/"
            element={<Swap isConnected={isConnected} address={address} />}
          />
          <Route
            path="/Dashboard"
            element={
              <Dashboard
                dollars={dollars}
                balance={balance}
                seeds={seeds}
                rewards={rewards}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
