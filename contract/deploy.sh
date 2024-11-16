source .env


# Scroll deployment
forge script \
  --rpc-url $SCROLL_RPC_URL \
  --private-key $PRIVATE_KEY \
  script/Wine.s.sol:WineScript \
  --verify \
  --verifier blockscout \
  --verifier-url https://scroll-sepolia.blockscout.com/api/ \
  --broadcast


# Sepolia deployment
forge script \
  --rpc-url $SEPOLIA_RPC \
  --private-key $PRIVATE_KEY \
  script/Wine.s.sol:WineScript \
  --verify \
  --verifier blockscout \
  --verifier-url https://eth-sepolia.blockscout.com/api/ \
  --broadcast

  