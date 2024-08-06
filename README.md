## Pano

Pano is for operating and monitoring an on-chain derivative market (as an observer or admin), or managing your positions as an liquidity provider or trader. At this time (the very first version) it is designed to only work with an upcoming on-chain options market [Panoptic](https://github.com/panoptic-labs/panoptic-v1-core), which is oracle-free (by leveraging Uniswap V3), and supports both buying and selling options by under-collaterized traders. 

Pano natively works with deployments on Harmony.

### Pano CLI

An opinionated command line interface for interacting with forked deployments of Panoptic protocol

- (WIP) Liquidity provider tools
  - Monitoring profits, losses, risks in pools
  - Connects with MetaMask and other wallets
  - Managing deposits and withdraws
- (WIP) Operator tools
  - Pool growth and statistics
  - Liquidatable accounts and positions
  - Forced-exercise suggestions
- (Coming soon) Option seller tools
- (Coming soon) Option buyer and trader utilities

Developed based on deployment fork:
https://github.com/polymorpher/panoptic-v1-core

Original Panoptic source code:
https://github.com/panoptic-labs/panoptic-v1-core
