import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Card from "../components/card"
import { useState } from "react";
import { getCircleSdk } from "../utils/circleSdk";

const Home: NextPage = () => {

  const [wallet, setWallet] = useState(null);

  const createWallet = async () => {
    try {
      const circleSdk = getCircleSdk();
      const response = await circleSdk.createWallet();
      setWallet(response.wallet);
      console.log("Wallet created:", response.wallet);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <header className='flex justify-end px-5 py-2 border-b border-slate-200'>
      <ConnectButton />
      </header>
      <div className='flex justify-center mt-5 text-3xl font-bold'>Wine-Marketplace🍷
      </div>
      <div className='flex justify-center'><Card /></div>
      <div>
      <h1>Circle Wallet</h1>
      <button onClick={createWallet}>Create Wallet</button>
    </div>
    </div>
    
  );
};

export default Home;
