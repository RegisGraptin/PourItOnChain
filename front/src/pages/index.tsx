import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import ShowcaseWine from '../components/ShowcaseWine';
import Header from '../components/Header';

const Home: NextPage = ()  => {



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
