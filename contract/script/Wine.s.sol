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

        // Get from https://docs.brevis.network/developer-resources/legacy-deployments
        address brevisRequestAddress = 0x841ce48F9446C8E281D3F1444cB859b4A6D0738C;

        // Notice: on scroll pyth entropy does not exists
        // Same not in ethereum sepolia
        // Base
        address pythEntropyAddress = 0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c;


        // Chronicle Oracle data
        // https://docs.chroniclelabs.org/Developers/testnet
        // address selfKisserAddress = 0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d;
        // address chronicleOracleAddress_ETH_USD = 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660;


        // address selfKisserAddress = 0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d;
        // address chronicleOracleAddress_ETH_USD = 0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603;

        // Base 
        address selfKisserAddress = 0x70E58b7A1c884fFFE7dbce5249337603a28b8422;
        address chronicleOracleAddress_ETH_USD = 0xea347Db6ef446e03745c441c17018eF3d641Bc8f;

        wine = new Wine(
            brevisRequestAddress,
            pythEntropyAddress, 
            selfKisserAddress,
            chronicleOracleAddress_ETH_USD
        );// eth-rpc

        vm.stopBroadcast();
    }
}
