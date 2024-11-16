import crypto from "crypto";

import Image from "next/image";

import { Address, formatEther, parseEther } from "viem"
import { useAccount, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi"

import WineContract from "../abi/Wine.json";
import { useEffect, useState } from "react";

export default function WineCard({bottleId, bottleDetail}) {

  const { address, isConnected } = useAccount();

  // Check if the bottle is for sell
  const { data: isForSell, isLoading: isForSellLoading } = useReadContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'forSell',
      args: [bottleId],
  })

  const { data: ethPrice, isLoading: ethPriceLoading } = useReadContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'readUSDPriceFromETH',
      args: [],
  })

  const { data: contestTimeStamp, isLoading: contestTimeStampLoading } = useReadContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'contestTimeStamp',
      args: [bottleId],
  })

  const { data: ownerOf, isLoading: ownerOfLoading } = useReadContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'ownerOf',
      args: [bottleId],
  })


  function computePriceInEth() {
    if (!ethPrice) { return "Loading..." }
    const eth_value = Number(bottleDetail[3]) / Number(formatEther(ethPrice));
    return "Buy " + eth_value.toString().slice(0,6) + " ETH" ;
  }

  
  const {data: hash, error, isPending, writeContract} = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const buyBottle = () => {

    let val = Number(bottleDetail[3]) / Number(formatEther(ethPrice));
    let percent = val / 100
    val += percent;

    // val += 0.0010;
    console.log(val);

    const price = parseEther(val.toString());
    console.log(price)

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'buyBottle',
      args: [bottleId],
      value: price
    });
  }

  const endContestAction = () => {

    // Generate a random value locally
    let randomNumber = crypto.randomBytes(32).toString("hex");

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: WineContract.abi,
      functionName: 'endContest',
      args: [bottleId, "0x" + randomNumber]
    });
  }



  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 ml-2 mr-2 mb-4">
      <div className="relative h-128 m-2.5 overflow-hidden text-white rounded-md">
        <Image
          src={"/images/wine_"+ bottleId + ".jpg"} 
          alt="card-image" 
          height={500}
          width={230}
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {bottleDetail[0]}
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          {bottleDetail[1]}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">

        {isForSell && (
          <>
            <button 
              className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={buyBottle}
            >
              {computePriceInEth()}
            </button>          
          </>
        )}

        {!contestTimeStamp && !isForSell && (
          <>
            <button disabled className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
              Sold out
            </button>          
          </>
        )}

        {contestTimeStamp && (
          <>
            <button disabled className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
              For contest
            </button>
            <button 
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
              type="button"
              onClick={endContestAction}
            >
              End contest - demo
            </button>
          </>
        )}


        {address == ownerOf && (
          <div className="relative inline-flex">
            <button disabled className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Owned
            </button>
            <span className="absolute top-0.5 right-0.5 grid min-h-[28px] min-w-[28px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-green-600 py-1 px-1 text-xs text-white border border-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        )}
        


        {/* {hash && <div>Transaction Hash: {hash}</div>} */}
        {/* {isConfirming && <div>Waiting for confirmation...</div>} */}
        {/* {isConfirmed && <div>Transaction confirmed.</div>} */}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}


      </div>
    </div> 
  );
}