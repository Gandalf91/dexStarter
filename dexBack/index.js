const express = require('express')
const Moralis = require('moralis').default
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = 3001
const ABI = require('./abi.json')

app.use(cors())
app.use(express.json())

app.get('/getNameAndBalance', async (req, res) => {
  const { userAddress } = req.query

  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: '0x89',
    address: '0xf488B7963FA40D3800e59d0cb91a4a25315eE4c6',
    functionName: 'getMySeeds',
    abi: ABI,
    params: { adr: userAddress },
  })

  const jsonResponseSeeds = response.raw

  const secResponse = await Moralis.EvmApi.balance.getNativeBalance({
    chain: '0x89',
    address: userAddress,
  })

  const jsonResponseBal = (secResponse.raw.balance / 1e18).toFixed(2)

  const thirResponse = await Moralis.EvmApi.token.getTokenPrice({
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  })

  const jsonResponseDollars = (
    thirResponse.raw.usdPrice * jsonResponseBal
  ).toFixed(2)

  const fourResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: '0x89',
    address: '0xf488B7963FA40D3800e59d0cb91a4a25315eE4c6',
    functionName: 'seedRewards',
    abi: ABI,
    params: { adr: userAddress },
  })

  const jsonResponseRewards = (fourResponse.raw.value / 1e18).toFixed(6)

  const jsonResponse = {
    seeds: jsonResponseSeeds,
    balance: jsonResponseBal,
    dollars: jsonResponseDollars,
    rewards: jsonResponseRewards,
  }

  return res.status(200).json(jsonResponse)
})

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`)
  })
})
