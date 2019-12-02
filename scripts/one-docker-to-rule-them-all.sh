#!/bin/bash

set -euo pipefail

# make sure we have the latest images
# (workaround until next version of docker supports the --pull flag)
docker pull augurproject/safe-relay-service_web:latest
docker pull 0xorg/mesh:0xV3

# run docker image, creating or updating local-addresses.json
yarn docker:geth:pop

# pick up the creation of / changes to local-addresses.json
yarn build

# run docker ecosystem with variables derived from geth node
export ETHEREUM_CHAIN_ID=`yarn --silent flash run network-id | sed '1d'`
export CUSTOM_CONTRACT_ADDRESSES=`yarn --silent flash run get-all-contract-addresses --ugly | sed '1d'`
#yarn docker:gnosis
yarn workspace @augurproject/gnosis-relay-api run-relay
