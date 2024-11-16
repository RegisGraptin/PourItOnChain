
## Pyth Notes

On the documentation, regarding the workflow, I think some improvment can be made for the entropy. 



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
