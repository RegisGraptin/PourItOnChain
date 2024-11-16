import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FormEvent } from "react"
import { Address } from "viem"
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi"


import WineContract from "../../abi/Wine.json";

export default function CreateNewBottle(){
    


  const {
    data: hash,
    error,
    isPending,
    writeContract
  } = useWriteContract()


  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })



    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // name / description / year /priceUSD
        const formData = new FormData(event.currentTarget)

        console.log(formData)

        // Write to smart contract
        writeContract({
          address: process.env.NEXT_PUBLIC_CONTRACT as Address,
          abi: WineContract.abi,
          functionName: 'addBottle',
          args: [
            formData.get("name")?.toString(),
            formData.get("description")?.toString(),
            formData.get("year"),
            formData.get("price")
          ],
        })

    }

    return <>

        <ConnectButton />
        <form onSubmit={onSubmit}>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">Create a new bottle</h2>
              <p className="text-gray-500 mb-6"></p>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Bottle Information</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          name='description'
                          rows={4}
                          className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-50"
                          placeholder="Description...">
                        </textarea>
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="recipient">Year</label>
                        <input 
                          type="number" 
                          name="year" 
                          id="year" 
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                          placeholder='2022'
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="recipient">Price (USD)</label>
                        <input 
                          type="number" 
                          name="price"
                          id="price"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                          placeholder='20$'
                        />
                      </div>


                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button disabled={isPending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isPending ? 'Confirming...' : 'Submit'}
                          </button>
                        </div>
                      </div>


                      {hash && <div>Transaction Hash: {hash}</div>}
                      {isConfirming && <div>Waiting for confirmation...</div>}
                      {isConfirmed && <div>Transaction confirmed.</div>}
                      {error && (
                        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                      )}


                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </>

}
