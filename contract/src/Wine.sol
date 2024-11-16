// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Wine is ERC721 {

    uint256 public nextTokenId;

    struct BottleMetaData {
        string name;
        string description;
        uint256 year;
        uint256 priceUSD;
    }


    /// Mapped if a user already buy an item from us
    mapping (address => bool) alreadyBuy;
    address[] listOfUserAddresses;


    mapping (uint256 => BottleMetaData) bottleData;
    mapping (uint256 => bool) forSell;
    mapping (uint256 => bool) forContest;

    event CreatedBottle (address indexed creator, string name);
    event BuyBottle (address indexed, uint256);
    
    constructor() ERC721("WineBottle", "WBTL") {}

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
        

        // FIXME: check the amount of eth based on chronicle oracle
        (bool sent, bytes memory _data) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit BuyBottle(msg.sender, tokenId);
    }


    function createContest(
        string memory name, 
        string memory description, 
        uint256 year,
        uint256 priceUSD
    ) public returns (uint256) {
        uint256 tokenId = addBottle(name, description, year, priceUSD);
        // This one is not for sell
        forSell[tokenId] = false;
        forContest[tokenId] = true;

        // FIXME: create contest mechanism

        return tokenId;
    }



}