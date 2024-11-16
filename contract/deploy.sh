source .env

forge script --chain scroll script/Wine.s.sol:WineScript --rpc-url $SCROLL_RPC_URL --broadcast --verify --verifier blockscout --verifier-url https://scroll-sepolia.blockscout.com/api?module=contract&action=verify -vvvv