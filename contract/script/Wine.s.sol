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

        address account = vm.addr(deployerPrivateKey);

        wine = new Wine();

        vm.stopBroadcast();
    }
}
