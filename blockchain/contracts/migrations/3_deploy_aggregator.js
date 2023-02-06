const BBAggregator = artifacts.require('BBAggregator');

module.exports = function (deployer) {
  deployer.deploy(BBAggregator);
};
