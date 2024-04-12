import { ChainID, getRPC } from "../src/chains";
import { ContractPlugin, getSource } from "../src/index";
import Web3, { Contract, ContractAbi } from "web3";

(async () => {
    // console.log("Playground!")

    const chain = ChainID.CORE_MAINNET;
    // const rpc = getRPC(chain);
    // const web3 = new Web3(
    //     new Web3.providers.HttpProvider(rpc));
    // web3.registerPlugin(new ContractPlugin(""));

    // const chainId = await web3.eth.getChainId()
    // console.log(chainId)

    const contractAddress = "0x2d0f7e0d10ed119b77b1b0e882aed7f079cf4f21";
    // const data = await web3.contractPlugin.source(contractAddress);
    // console.log(data)
    // const contract: Contract<ContractAbi> = await web3.contractPlugin.contract(contractAddress);
    // console.log(await contract.methods.name().call())

    // web3.setProvider("https://bittorrent.drpc.org");
    // web3.contractPlugin.updateKey = "GCKCPDBKR7BW75P7HY5F7EA7BZRCITESY1";


    // const contract2 = await web3.contractPlugin.contract("0xc0f70509e091bdb3864ffbdd3daf8f16c0c6fd62");
    // console.log(await contract2.methods.name().call())

    // const pong = web3.contractPlugin.ping()
    // console.log(pong)

    const source = await getSource(contractAddress, {
        chainId: chain,
    })

    console.log(source)
})()