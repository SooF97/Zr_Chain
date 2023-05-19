//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol"; // is the console.log equivalent in solidity
// it has some function to use them for logging and debugging
import "@openzeppelin/contracts/utils/Counters.sol"; // it's a counter we use it to keep track of counting something
// in here we will wanna keep track of counting number of NFTs minted
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // it's a set of functions (an interface)
// that helps you store the token URIs
// TOKEN URI = the url where the metadata of your nft will be stored
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DocMinter is ERC721URIStorage {
    address public owner;
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;
    Counters.Counter public nftsMinted;
    uint256 public fileId = 0;

    address[] private usersAllowed = [
        0x613D035C32737aA1A93F2eE8cF03FD4d1eE58000,
        0x7654648B108374be5B0452C4816000D149f1aA4d,
        0xf2035cd8140e654bA5e8c4e6FdFd15A6a7F763C1
    ];

    constructor() ERC721("DOChain", "DOC") {
        owner = msg.sender;
    }

    struct nftInfo {
        uint256 _fileId;
        string _fileDocName;
        string _userCIN;
        string _fileURL;
        string _gender;
        string _mintDate;
        address _ownerOfNft;
    }

    // a mapping that maps every tokenId with extra information about the token minted
    mapping(uint256 => nftInfo) public idToNftInfo;

    nftInfo[] public data;

    // we should create an event to trigger it when a mint happens
    event createNft(uint256 indexed _tokenId, address indexed _owner);

    // function that checks if the caller of the createToken function is valid:
    function checkUserAddress() public view returns (bool) {
        uint256 i = 0;
        for (i = 0; i < usersAllowed.length; i++) {
            if (msg.sender == usersAllowed[i]) {
                return true;
            }
        }
        return false;
    }

    // function to mint the token to the blockchain:
    function createToken(
        string memory tokenUri,
        string memory fileName,
        string memory userCIN,
        string memory fileURL,
        string memory gender,
        string memory mintDate
    ) public returns (uint256) {
        require(checkUserAddress(), "You are not allowed to mint!");
        tokenIdCounter.increment();
        uint256 currentTokenId = tokenIdCounter.current();
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenUri);

        setTokenInfo(
            currentTokenId,
            fileName,
            userCIN,
            fileURL,
            gender,
            mintDate
        );
        setData(currentTokenId);
        nftsMinted.increment();
        emit createNft(currentTokenId, msg.sender);
        return fileId = currentTokenId;
    }

    // a function that checks if a token exists or not
    function exist(uint256 id) public view returns (bool) {
        return _exists(id);
    }

    // a function to get the token Id :

    function getTokenId() public view returns (uint256) {
        return fileId;
    }

    /* function to set and to get info about the token:
        info like : 
            - tokenID
            - owner of the token
    */
    function setTokenInfo(
        uint256 _tokenID,
        string memory _fileName,
        string memory _CIN,
        string memory fileUrl,
        string memory _gender,
        string memory _mintDate
    ) public {
        idToNftInfo[_tokenID] = nftInfo(
            _tokenID,
            _fileName,
            _CIN,
            fileUrl,
            _gender,
            _mintDate,
            ownerOf(_tokenID)
        );
    }

    function getTokenInfo(
        uint256 _tokenID
    ) public view returns (nftInfo memory) {
        return idToNftInfo[_tokenID];
    }

    function setData(uint256 _tokenID) public {
        data.push(idToNftInfo[_tokenID]);
    }

    function getData() public view returns (nftInfo[] memory) {
        require(msg.sender == owner, "Not the owner");
        return data;
    }

    // function to show the tokens that a wallet address have:

    function getMyNfts() public view returns (nftInfo[] memory) {
        uint256 totalNftsMinted = nftsMinted._value;
        uint256 itemCounter = 0;
        uint256 id = 1;
        for (id; id <= totalNftsMinted; id++) {
            if (idToNftInfo[id]._ownerOfNft == msg.sender) {
                itemCounter = itemCounter + 1;
            }
        }
        nftInfo[] memory userNftInfo = new nftInfo[](itemCounter);
        uint256 i;
        uint256 listIndex = 0;
        for (i = 1; i <= totalNftsMinted; i++) {
            if (idToNftInfo[i]._ownerOfNft == msg.sender) {
                userNftInfo[listIndex] = idToNftInfo[i];
                listIndex += 1;
            }
        }
        return userNftInfo;
    }

    // function that will transfer the ownership of the NFT
    //  function transferToken(address _to, uint256 _tokenID) public {
    //require(msg.sender == ownerOf(_tokenID), "Not allowed to transfer");
    //  require(checkUserAddress(), "You are not an admin user!");
    //  safeTransferFrom(ownerOf(_tokenID), _to, _tokenID);
    //setTokenInfo(_tokenID);
    //}
}
