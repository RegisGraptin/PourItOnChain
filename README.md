# wine-marketplace

code deploy: 0xaE5Dd577835069e6686963C4d36acb7CFe87De04
scroll sepolia


contract 0x535aFA095b8F208c9834765Fc050c30B558DE333.
sepolia network


auto blockscout deployed at: https://scroll.cloud.blockscout.com/




Note blockscout 
On the endpoint needed to do: '?module=contract&action=verify'

 "https://scroll-sepolia.blockscout.com/api?module=contract&action=verify"


Note that the url in forge is not the same verified
Input url should be: https://scroll-sepolia.blockscout.com

https://scroll-sepolia.blockscout.com/address/0xf7d25eb89fC8D1530c4304CCbF57922419f0BCF9



Issue for rollup scroll



Note pyth:

Why the 
 function getEntropy() internal view override returns (address) {
    return address(entropy);
  }

  is mandatory, what values does it brings ? 



Doc inconsistency

> https://docs.pyth.network/entropy/generate-random-numbers/evm

function requestRandomNumber(bytes32 userRandomNumber) external payable {
  uint256 fee = entropy.getFee(entropyProvider);
 
  uint64 sequenceNumber = entropy.requestWithCallback{ value: fee }(
    entropyProvider,
    userRandomNumber
  );
}
 

> But then 

 function requestRandomNumber(bytes32 userRandomNumber) external payable {
    // Get the default provider and the fee for the request
    address entropyProvider = entropy.getDefaultProvider();
    uint256 fee = entropy.getFee(entropyProvider);
 


 see `address entropyProvider = entropy.getDefaultProvider();`
that just appear



------------
Note for chronicle 

confusing example ??

   function tokenAmount(uint256 amountWei) public view returns (uint256) {
        // Send amountETH, how many USD I have
        uint256 ethUsd = _read(); // Price feed has 10**18 decimal places
        uint256 amountUSD = (amountWei * ethUsd) / 10 ** 18; // Price is 10**18
        uint256 amountToken = amountUSD / 10 ** 18; // Divide to convert from wei to ETH
        return amountToken;
    }


amountToken => should be amount in usdc in the end



## Brevis

Regarding the on-chain behaviour analytics, we are using Brevis, by leveraging the ZK-coprocessor mechanism. Indeed, it can be costly to store and search on-chain data in a smart contract. Instead, we can do this computation off-chain, by watching the past event of a user through his address and generate a ZK-proof that we are going to use to prove that the user is a loyal and regular costumer.

#### Walkthrough

Some buy events we want to track (https://eth-sepolia.blockscout.com/tx/0x8a44a7c0da33a180320f2a45ebeaeca4beaab276ac4ac002bacc7533c3999e7b?tab=logs). We have defined a circuit in `prover/circuits/circuit.go` that track and count the number of buy event that happened on chain. To run this services for validate new ones, we can do:

```bash
cd prover
make start
```

Then, to generate the proof for a given user, we have start working on the server that will managed all this process. You can find it in `brevis_verifier_node/` folder. There, we can simply run it with 

```bash
cd brevis_verifier_node
npm start
```

Then, to build and verify a user behaviour, we can simply call `localhost:3010/events` where we will have a proof generated on the background.

Unfortunatly, due to time issue, we could not integrate all the pipeline process. But we managed to generate a ZK Proof for the user.

