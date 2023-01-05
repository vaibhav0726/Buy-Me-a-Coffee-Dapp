// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract buyACoffee{
    struct Memo{
        string name;
        string message;
        uint timeStamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor(){
        // to make owner to recieve the ethers
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }


    // memory because it is referenced data-type
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
}