import { Address } from "viem"
import { useReadContract, useReadContracts } from "wagmi"

import WineContract from "../abi/Wine.json";

import WineCard from "./WineCard"

export default function ShowCaseWine () {

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


    return <>
        <h2>Get last bottle - {Number(lastBottleId)}</h2>
        
        <section className="bg-white pt-40">
            <div className="flex flex-wrap p-4 justify-center">


            {bottlesData && bottlesData.map(function (bottleData, i) {
                return <WineCard key={i} bottleId={i} bottleDetail={bottleData.result} />
            })}

        </div>
        </section>

    </>

}
