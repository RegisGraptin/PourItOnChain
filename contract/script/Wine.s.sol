// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Wine} from "../src/Wine.sol";

contract WineScript is Script {
    Wine public wine;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // address account = vm.addr(deployerPrivateKey);

        // Notice: on scroll pyth entropy does not exists
        // Same not in ethereum sepolia
        address pythEntropyAddress = 0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344;


        // Chronicle Oracle data
        // https://docs.chroniclelabs.org/Developers/testnet
        // address selfKisserAddress = 0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d;
        // address chronicleOracleAddress_ETH_USD = 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660;


        address selfKisserAddress = 0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d;
        address chronicleOracleAddress_ETH_USD = 0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603;

        wine = new Wine(
            pythEntropyAddress, 
            selfKisserAddress,
            chronicleOracleAddress_ETH_USD
        );// eth-rpc

        vm.stopBroadcast();
    }
}
