pragma solidity 0.5.0;

import "andromeda/contracts/interface/IChain.sol";
import "contract-registry/contracts/interfaces/IRegistrable.sol";

contract Chain is IRegistrable, IChain {
  bytes32 constant NAME = "Chain";

  bool private _isProposePhase;

  constructor ()
  public {
  }

  function setProposePhase(bool val) external {
    _isProposePhase = val;
  }

  function isProposePhase() external view returns (bool) {
    return _isProposePhase;
  }

  function contractName() external view returns (bytes32) {
    return NAME;
  }

  function register() external returns (bool) {
    return true;
  }

  function propose(bytes32 _blindedProposal) external returns(bool) {
    require(false, "not implemented");
  }

  function reveal(bytes32 _proposal, bytes32 _secret) external returns(bool) {
    require(false, "not implemented");
  }

  function getBlockRoot(uint256 _blockHeight, uint256 _shard) external view returns (bytes32) {
    require(false, "not implemented");
  }

  function getBlockVoter(uint256 _blockHeight, address _voter)
  external view returns (bytes32 blindedProposal, uint256 shard, bytes32 proposal, uint256 balance) {
    require(false, "not implemented");
  }

  function getBlockCount(uint256 _blockHeight, uint256 _shard, bytes32 _proposal) external view returns (uint256) {
    require(false, "not implemented");
  }

  function isElectionValid(uint256 _blockHeight, uint256 _shard) external view returns (bool) {
    require(false, "not implemented");
  }

  function isRegistered() external view returns (bool) {
    require(false, "not implemented");
  }

  function unregister(IRegistrable _newInstance) external {
    require(false, "not implemented");
  }
}
