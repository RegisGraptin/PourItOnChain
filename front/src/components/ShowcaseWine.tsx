import { Address } from "viem"
import { useReadContract } from "wagmi"



import WineContract from "../abi/Wine.json";


export default function ShowCaseWine () {

    const { data: lastBottleId, isLoading: lastBottleIdLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT as Address,
        abi: WineContract.abi,
        functionName: 'nextTokenId',
        args: [],
    })

    console.log(lastBottleId)

    return <>
        <h2>Get last bottle - {Number(lastBottleId)}</h2>
        
    </>

}
