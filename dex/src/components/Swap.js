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
import Tg from '../tg1.svg'

function Swap({ getNameAndBalance }) {
  const [inputAmount, setInputAmount] = useState(null)

  function changeAmount(e) {
    setInputAmount(e.target.value)
  }

  const settings = (
    <>
      <div>
        Min. investment should be 100 Matic. Max: 20k Matic
        <p>To invest, first make sure your wallet is connected</p>{' '}
        <p>Insert amount below and confirm the transaction in Metamask.</p>
        <p>
          If have any questions, please don't hesitate to seek help in our tg
          group chat
        </p>
        <p>Please use Metamask wallet only.</p>
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
        <div className="headerItem2">
          <a
            href="https://t.me/fastmaticofficial"
            target="_blanck"
            rel="noreferrer">
            <img src={Tg} alt="tg" />
          </a>
        </div>

        <div className="tradeBoxHeader">
          <h4>AUTOMATED MEME COIN TRADING WITH 300% MONTHLY RETURN</h4>
          <Popover content={settings} trigger="click" placement="bottomRight">
            <SettingOutlined className="cog" />
          </Popover>
        </div>

        {/*  <div className="balanceOptions">
          <div className="extraOption">
            <a
              href="https://drive.google.com/file/d/1WpGukOG5ViKdKaSuRXUoP44JuY6NHBCh/view?usp=share_link"
              target="_blank"
              rel="noreferrer">
              How Does It Work?
            </a>
          </div>
        </div> */}
        <div className="balanceOptions">
          <div className="extraOption">
            {/* <a href="https://chubinft.live" target="_blank" rel="noreferrer">
              Mint CHUBI NFTs
            </a> */}
            Invest and 3x in a month!!
          </div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">Start with as low as 100 Matic</div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">No Lock-ups! Withdraw Anytime</div>
        </div>
        <div className="balanceOptions">
          <div className="extraOption">Newbie Friendly Easy To Use</div>
        </div>
        {/* <div className="balanceOptions">
          <div className="extraOption">
            <a href="https://chubinft.live" target="_blank" rel="noreferrer">
              Mint NFTs
            </a>{' '}
            for Extra 25-75% Yield
          </div>
        </div> */}
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
          <div className="extraOption2">
            You Invest - We Trade. Monthly 300% Guaranteed
          </div>
        </div>
      </div>
    </>
  )
}

export default Swap
