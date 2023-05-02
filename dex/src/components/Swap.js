import React, { useState, useEffect } from 'react'
import { Input, Popover, Radio, Modal, message, Button } from 'antd'
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { polygon } from '@wagmi/chains'
import ABI from '../abi.json'

function Swap({ getNameAndBalance }) {
  const [inputAmount, setInputAmount] = useState(null)

  function changeAmount(e) {
    setInputAmount(e.target.value)
  }

  const settings = (
    <>
      <div>
        Min investment should be 25 Matic. Max is 20k Matic.
        <p>To invest, make sure your wallet is connected then</p>{' '}
        <p>insert amount below and confirm the transaction in Metamask.</p>
        <p>If have any questions, please don't hesitate to join our tg group</p>
      </div>
    </>
  )

  const ref = '0xEFb39023914fd3C54a29e6fBFD454e326c4b2E3C'

  const { config } = usePrepareContractWrite({
    chainId: polygon.id,
    address: '0xf488B7963FA40D3800e59d0cb91a4a25315eE4c6',
    abi: ABI,
    functionName: 'plantSeeds',
    args: [ref],
    overrides: {
      value: String(Number(inputAmount * 1e18)),
    },
  })

  const { write, data } = useContractWrite(config)

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

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
    if (isSuccess || isSuccessHarvest || isSuccessReplant) {
      getNameAndBalance()
    }
  }, [isSuccess, isSuccessHarvest, isSuccessReplant])

  return (
    <>
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>FIRST EVER MATIC AGGREGATOR IN DEFI</h4>
          <Popover content={settings} trigger="click" placement="bottomRight">
            <SettingOutlined className="cog" />
          </Popover>
        </div>

        <div className="balanceOptions">
          <div className="extraOption">Earn 2% Matic Daily</div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">Automated Instant Payouts</div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">No Lockup! Withdraw Anytime</div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">Newbie Friendly Easy To Use</div>
        </div>
        <div className="balanceOptions3">
          <Input placeholder="0" value={inputAmount} onChange={changeAmount} />
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              write?.()
            }}>
            INVEST
          </Button>
        </div>
        {/* <button
          onClick={() => {
            writeHarvest?.()
          }}>
          harvest
        </button>
        <button
          onClick={() => {
            writeReplant?.()
          }}>
          Replant
        </button>*/}

        <div className="balanceOptions2">
          <div className="extraOption2">Daily Yield: 2% APR: 720%</div>
        </div>
      </div>
    </>
  )
}

export default Swap
