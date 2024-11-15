// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Wine is ERC721 {

    uint256 private _nextTokenId;

    struct BottleMetaData {
        string name;
        string description;
        uint256 year;
        uint256 priceUSD;
    }

    mapping (uint256 => BottleMetaData) bottleData;

    event CreatedBottle (address indexed creator, string name);
    event BuyBottle (address, uint256);
    

    constructor() ERC721("WineBottle", "WBTL") {}

    function addBottle(
        string memory name, 
        string memory description, 
        uint256 year,
        uint256 priceUSD
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);

        // Create the associated metadata
        bottleData[tokenId] = BottleMetaData({
            name: name,
            description: description,
            year: year,
            priceUSD: priceUSD
        });

        emit CreatedBottle(msg.sender, name);

        return tokenId;
    }

}