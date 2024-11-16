source .env

# Base deployment
forge script \
  --rpc-url $BASE_RPC \
  --private-key $PRIVATE_KEY \
  script/Wine.s.sol:WineScript \
  --verify \
  --verifier blockscout \
  --verifier-url https://base.blockscout.com/api/ \
  --broadcast

  