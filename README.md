# PourItOnChain

Currently, in the blockchain all the transactions are public, meaning that all user behaviour are also public. However, no one is currently using this data to retain customer by providing incentive.
For marketplace, one potential incentive for the user would be to offer him a free gift after some transactions. In the case of our wine marketplace, we can offer him a free bottle after 12 bought. 
Or, as currently, wine markeplace already exists, I could decide to launch an aggressive acquisition campaign, by promoting and reward users from competitor. In that case, if one person buying a bottle from me, as he is currently buying from my competitor, I can offer him a free bottle to incentive him to come buy from me instead of my competitor.
Finally, we though about organize contest on-chain by leveraging randomness and keep retain the customer from our marketplace as we want him to create a trustworthy relationship with him on the long run.

## Contract deployed

Last contract deployed:
On Base: 0x940fb3325A8529C015AA55E6ca2022149f900AcE
Verified contract on Blockscout: https://base-sepolia.blockscout.com/address/0x940fb3325A8529C015AA55E6ca2022149f900AcE


## Additional notes 

Prevous contract on Sepolia network: 0x535aFA095b8F208c9834765Fc050c30B558DE333.


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

