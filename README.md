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