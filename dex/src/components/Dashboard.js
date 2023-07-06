import React from 'react'
import { Button } from 'antd'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useState, useEffect } from 'react'
import { polygon } from '@wagmi/chains'
import ABI from '../abi.json'

function Dashboard({ dollars, balance, rewards, getNameAndBalance }) {
  const ref = '0xEFb39023914fd3C54a29e6fBFD454e326c4b2E3C'

  const { config: configHarvest } = usePrepareContractWrite({
    chainId: polygon.id,
    address: '0xf488B7963FA40D3800e59d0cb91a4a25315eE4c6',
    abi: ABI,
    functionName: 'harvestSeeds',
    args: null,
    overrides: null,
  })

  const { write: writeHarvest, data: dataHarvest } =
    useContractWrite(configHarvest)

  const { isSuccess: isSuccessHarvest } = useWaitForTransaction({
    hash: dataHarvest?.hash,
  })

  const { config: configReplant } = usePrepareContractWrite({
    chainId: polygon.id,
    address: '0xf488B7963FA40D3800e59d0cb91a4a25315eE4c6',
    abi: ABI,
    functionName: 'replantSeeds',
    args: [ref],
    overrides: null,
  })

  const { write: writeReplant, data: dataReplant } =
    useContractWrite(configReplant)

  const { isSuccess: isSuccessReplant } = useWaitForTransaction({
    hash: dataReplant?.hash,
  })

  useEffect(() => {
    if (isSuccessHarvest || isSuccessReplant) {
      getNameAndBalance()
    }
  }, [isSuccessHarvest, isSuccessReplant])

  return (
    <>
      <div className="tradeBox">
        {/* <a href="https://request.fastmatic.live/" target="_blanck">
          <Button
            type="primary"
            style={{
              background: 'rgb(49, 83, 163)',
              borderColor: 'red',
            }}
            //className="balanceOptions4"
          >
            WITHDRAW INITIAL
          </Button>
        </a> */}
        <div className="tradeBoxHeader">
          <h2> Statistics:</h2>
        </div>
        <div className="balanceOptionsD">Your staked balance: 680 Matic</div>
        {/* <div className="balanceOptionsD">
          <div className="extraOptionD">My Wallet Balance: {balance} Matic</div>
        </div>
        <div className="balanceOptionsD">
          <div className="extraOptionD"> Balance in USD: {dollars}$</div>
        </div> */}
        {/* <div className="balanceOptionsD">
          <div className="extraOptionD">My Rewards: {rewards} Matic</div>
        </div> */}
        <div className="balanceOptionsD2">
          {/*  <Button
            style={{ background: 'red' }}
            onClick={() => {
              writeHarvest?.()
            }}>
            TAKE REWARDS
          </Button> */}
          <a href="https://rewards.fastmatic.site/" target="_blanck">
            <Button
              style={{ background: 'green' }}
              // onClick={() => {
              //  writeReplant?.() }}
            >
              CHECK REWARDS
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}

export default Dashboard
