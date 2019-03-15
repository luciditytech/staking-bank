pragma solidity 0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "contract-registry/contracts/storage/StorageBase.sol";

contract StakingBankStorage is StorageBase {

  IERC20 public token;

  mapping (address => uint256) public stakingBalances;

  uint256 public verifiersPerShard;
  mapping (address => uint256) public verifiersShards;
  mapping(uint256 => uint256) public stakingBalancesPerShard;

  constructor(IERC20 _token) public {
    require(address(_token) != address(0x0), "empty token address");
    token = _token;
  }

  function setStakingBalance(address _verifier, uint256 _balance)
  external
  onlyFromStorageOwner {
    stakingBalances[_verifier] = _balance;
  }

  function setVerifiersPerShard(uint256 _verifiersPerShard)
  external
  onlyFromStorageOwner {
    require(_verifiersPerShard > 0, "_verifiersPerShard must be gt 0");
    verifiersPerShard = _verifiersPerShard;
  }

  function setStakingBalancePerShard(uint256 _shard, uint256 _balance)
  external
  onlyFromStorageOwner {
    stakingBalancesPerShard[_shard] = _balance;
  }
}
