source .env

forge script \
  --rpc-url $SCROLL_RPC_URL \
  --private-key $PRIVATE_KEY \
  script/Wine.s.sol:WineScript \
  --verify \
  --verifier blockscout \
  --verifier-url https://scroll-sepolia.blockscout.com/api/ \
  --broadcast