import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

import ShowcaseWine from '../components/ShowcaseWine';
import { useState } from "react";
import { getCircleSdk } from "../utils/circleSdk";
import Header from '../components/Header';

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
    <>
    <Header />
    
    <div className="flex flex-col justify-center">
      
      <ShowcaseWine />

    </div>
    </>
  );
};

export default Home;
