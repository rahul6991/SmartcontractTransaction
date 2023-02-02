pragma solidity ^0.8.9;
  
contract MessageInfo {

    struct msgInfo {
        string _str;
        address sender;
        uint256 time;
        uint block_number;
    }

    msgInfo[] public str;

    event MessageEvent(string _str, address indexed _from,uint256 _time, uint block_number);

   function store(string memory _str) public {
    str.push(msgInfo({ _str: _str, sender: msg.sender, time: block.timestamp, block_number: block.number}));
    emit MessageEvent(_str, msg.sender, block.timestamp, block.number);
    }

    function retrieve() public view returns (msgInfo[] memory){
        return str;
    }
}
