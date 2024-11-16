## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```


### Brevis data 

```
make start
go run ./cmd/main.go
>> compiling circuit
20:18:48 INF compiling circuit
ignoring uninitialized slice: Input_StorageSlots_Toggles []frontend.Variable
ignoring uninitialized slice: Input_Transactions_Toggles []frontend.Variable
20:18:48 INF parsed circuit inputs nbPublic=6 nbSecret=1090
ignoring uninitialized slice: Input_StorageSlots_Toggles []frontend.Variable
ignoring uninitialized slice: Input_Transactions_Toggles []frontend.Variable
ignoring uninitialized slice: Input_StorageSlots_Toggles []frontend.Variable
ignoring uninitialized slice: Input_Transactions_Toggles []frontend.Variable
commit output: rounds 1, data len 472, padded len 1088
20:18:49 INF building constraint builder nbConstraints=1027025
circuit compiled in 981.702902ms, number constraints 1027025
circuit digest 0x3d031233ff72b9ac6e3859a7edf47def80ad412f2cfc1221ad0a0e0cc4eeb96c
trying to read setup from cache...
no setup matching circuit digest 0x3d031233ff72b9ac6e3859a7edf47def80ad412f2cfc1221ad0a0e0cc4eeb96c is found in /home/rere/circuitOut
>> setup
size system 1027031
size lagrange 1048576
init SRS disk cache dir /home/rere/kzgsrs
fetching srs ignition from file
srs ignition not found in file
downloading file https://kzg-srs.s3.us-west-2.amazonaws.com/kzg_srs_100800000_bn254_MAIN_IGNITION
writing srs ignition file
srs iginition ready
setup done in 3.753854149s
///////////////////////////////////////////////////////////////////////////////
// vk hash: 0x1d3553d0192bfc1f5df1f574d8dcd6cd45cc5cdd21a06942eadcba5d84d74c2f
///////////////////////////////////////////////////////////////////////////////

67143336 bytes written to /home/rere/circuitOut/0x3d031233ff72b9ac6e3859a7edf47def80ad412f2cfc1221ad0a0e0cc4eeb96c/pk
34368 bytes written to /home/rere/circuitOut/0x3d031233ff72b9ac6e3859a7edf47def80ad412f2cfc1221ad0a0e0cc4eeb96c/vk
>> scan local storage: /home/rere/circuitOut/input/input/data.json
>> no local storage record: open /home/rere/circuitOut/input/input/data.json: no such file or directory>> serving prover REST API at port 33257
>> serving prover GRPC at port 33247
```
