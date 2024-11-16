import { Address } from "viem"
import { useReadContract, useReadContracts, useWriteContract } from "wagmi"

import WineContract from "../abi/Wine.json";

export default function WineCard({bottleId, bottleDetail}) {

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

  console.log(ethPrice)
  
  // const {data: hash, error, isPending, writeContract} = useWriteContract()

  // const buyAction = () => {
  //   writeContract({
  //     address: process.env.NEXT_PUBLIC_SEI_CONTRACT as Address,
  //     abi: AcknowledgeReceipt.abi,
  //     functionName: 'createReceipt',
  //     args: [
  //       formData.get("recipient")?.toString(),
  //       upload["cid"],
  //       payloadHash,
  //       routing_contract,
  //       _info,
  //     ],
  //     value: BigInt(amountOfGas),
  //   })
  // }


  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 ml-2 mr-2 mb-4">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img src="/images/wine_bottle.jpg" alt="card-image" />
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
        <div className="rounded-md bg-slate-800 items-center py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          test
        </div>

        <button className="rounded-md bg-slate-800 items-center py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          {isForSell && "Buy a bottle"}
          {!isForSell && "No stocks"}
          {ethPrice}
        </button>
      </div>
    </div> 
  );
}