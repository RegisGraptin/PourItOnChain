// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import { OracleReader } from "./OracleReader.sol";

contract Wine is ERC721, IEntropyConsumer, OracleReader {
    
    // Entropy from Pyth
    IEntropy public entropy;

    uint256 public nextTokenId;

    struct BottleMetaData {
        string name;
        string description;
        uint256 year;
        uint256 priceUSD;
    }

    /// Mapped if a user already buy an item from us
    mapping (address => bool) public alreadyBuy;
    address[] public listOfUserAddresses;

    mapping (uint256 => BottleMetaData) public bottleData;
    mapping (uint256 => bool) public forSell;
    mapping (uint256 => uint256) public contestTimeStamp;

    mapping (uint64 sequenceNumber => uint256) randomIndexToContest;

    event CreatedBottle (address indexed creator, string name);
    event BuyBottle (address indexed, uint256);
    event ContestWinner (address indexed, uint256 indexed);
    
    constructor(
        address entropyAddress,
        address selfKisserAddress,
        address chronicleOracleAddress_ETH_USD
    ) ERC721("WineBottle", "WBTL") OracleReader(selfKisserAddress, chronicleOracleAddress_ETH_USD) {
        entropy = IEntropy(entropyAddress);
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    // FIXME: For the demo: all person can create bottle offer - onlyOwner
    function addBottle(
        string memory name, 
        string memory description, 
        uint256 year,
        uint256 priceUSD
    ) public returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);

        // Create the associated metadata
        bottleData[tokenId] = BottleMetaData({
            name: name,
            description: description,
            year: year,
            priceUSD: priceUSD
        });
        forSell[tokenId] = true;

        emit CreatedBottle(msg.sender, name);

        return tokenId;
    }


    function buyBottle(uint256 tokenId) payable public {
        require(forSell[tokenId], "NOT_FOR_SELL"); // Bottle is for sell

        forSell[tokenId] = false;

        // Add users to the list
        if (!alreadyBuy[msg.sender]) {
            listOfUserAddresses.push(msg.sender);
            alreadyBuy[msg.sender] = true;
        }

        // Get the price of the bottle
        uint256 ethPrice = readUSDPriceFromETH();
        uint256 amountUSD = (msg.value * ethPrice) / 10 ** 18; // Price is 10**18
        uint256 amountUSDToken = amountUSD / 10 ** 18; // Divide again for the wei conversion
        
        // Check the USD price matching
        require(amountUSDToken > bottleData[tokenId].priceUSD, "Not enough wei from usdc conversion");

        // FIXME: check the amount of eth based on chronicle oracle
        (bool sent, bytes memory _data) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit BuyBottle(msg.sender, tokenId);
    }


    function createContest(
        string memory name, 
        string memory description, 
        uint256 year,
        uint256 priceUSD,
        uint256 dateEndContest
    ) public returns (uint256) {
        uint256 tokenId = addBottle(name, description, year, priceUSD);
        // This one is not for sell
        forSell[tokenId] = false;

        // Announce the contest in this function and set end time there
        contestTimeStamp[tokenId] = dateEndContest;

        return tokenId;
    }

    function endContest(uint256 tokenId, bytes32 userRandomNumber) public payable {
        require(contestTimeStamp[tokenId] > 0, "Not a contest");
        require(contestTimeStamp[tokenId] < block.timestamp, "Contest not finished");

        // Generate a random number to select the winner
        uint256 fee = entropy.getFee(entropy.getDefaultProvider());
        uint64 sequenceNumber = entropy.requestWithCallback{ value: fee }(
            entropy.getDefaultProvider(),
            userRandomNumber
        );

        // Will call the callback to announce the winner
        // Only store the associated contest ID to the sequence number
        randomIndexToContest[sequenceNumber] = tokenId;
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address provider,
        bytes32 randomNumber
    ) internal override {
        // Get back the tokenID based on the sequence number
        uint256 tokenId = randomIndexToContest[sequenceNumber];
    
        // Select a random index from our list of users
        uint256 randomIndex = uint256(randomNumber) % listOfUserAddresses.length;
        
        // Transfer the nft to the corresponsing user
        _transfer(address(this), listOfUserAddresses[randomIndex], tokenId);

        // Emit event
        emit ContestWinner(listOfUserAddresses[randomIndex], tokenId);
    }



}