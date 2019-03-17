pragma solidity 0.5.0;

import "digivice/contracts/interfaces/IVerifierRegistry.sol";
import "contract-registry/contracts/interfaces/IRegistrable.sol";

contract VerifierRegistry is IRegistrable, IVerifierRegistry {
  struct Verifier {
    uint256 balance;
  }

  mapping(address => Verifier) private _verifiers;

  function verifiers(address _verifier) external view returns (
    address id,
    string memory name,
    string memory location,
    bool active,
    uint256 balance,
    uint256 shard,
    bool enable
  ) {
    Verifier memory verifier = _verifiers[_verifier];

    return (
    address(0x0),
    "",
    "",
    false,
    verifier.balance,
    0,
    false
    );
  }

  function updateActiveStatus(bool _active) external {
    require(false, "not implemented");
  }

  bytes32 constant NAME = "VerifierRegistry";

  function contractName() external view returns (bytes32) {
    return NAME;
  }

  function register() external returns (bool) {
    return true;
  }

  function increaseShardBalance(address _verifier, uint256 _amount) external returns (bool) {
    _verifiers[_verifier].balance += _amount;
    return true;
  }

  function decreaseShardBalance(address _verifier, uint256 _amount) external returns (bool) {
    _verifiers[_verifier].balance -= _amount;
    return true;
  }

  function balancesPerShard(uint256 _shard) external view returns (uint256) {
    require(false, "not implemented");
  }

  function uniqueNames(bytes32) external view returns (bool) {
    require(false, "not implemented");
  }

  function addresses(uint256) external view returns (address) {
    require(false, "not implemented");
  }

  function verifiersPerShard() external view returns (uint256) {
    require(false, "not implemented");
  }

  function isRegisteredVerifier(address) external view returns (bool) {
    require(false, "not implemented");
  }

  function isRegistered() external view returns (bool) {
    require(false, "not implemented");
  }

  function unregister(IRegistrable _newInstance) external {
    require(false, "not implemented");
  }

  function updateEnableStatus(address _verifier, bool _enable) external {
    require(false, "not implemented");
  }
}
