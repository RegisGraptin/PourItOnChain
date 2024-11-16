import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FormEvent } from "react"
import { Address } from "viem"
import { BaseError, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi"


import WineContract from "../../abi/Wine.json";
import Header from "../../components/Header";
import WineCard from "../../components/WineCard";



export default function ClaimPage(){
    

      const { data: lastBottleId, isLoading: lastBottleIdLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT as Address,
        abi: WineContract.abi,
        functionName: 'nextTokenId',
        args: [],
    })

    const { data: bottlesData, isLoading: bottleDataLoading } = useReadContracts({
        contracts: Array.from({ length: Number(lastBottleId) }).map(
            (_, index) => ({
            abi: WineContract.abi,
            address: process.env.NEXT_PUBLIC_CONTRACT as Address,
            functionName: "bottleData",
            args: [index],
            })
        ),
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

    }

    return <>

        <Header />
        
         <section className="bg-white pt-40">
            <div className="flex flex-wrap p-4 justify-center">
                {bottlesData && bottlesData.map(function (bottleData, i) {
                    
                    return <WineCard key={i} bottleId={i} bottleDetail={bottleData.result} />
                })}
            </div>
        </section>

    </>

}
