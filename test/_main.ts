import { ChainID, getRPC } from "../src/chains";
import { ContractPlugin } from "../src/index";
import Web3, { Contract, ContractAbi } from "web3";

(async () => {
    console.log("Playground!")

    const chain = ChainID.METIS_ANDROMEDA;
    const rpc = getRPC(chain);
    const web3 = new Web3(
        new Web3.providers.HttpProvider(rpc));
    web3.registerPlugin(new ContractPlugin(""));

    const chainId = await web3.eth.getChainId()
    console.log(chainId)

    const contractAddress = "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481";
    const data = await web3.contractPlugin.source(contractAddress);
    console.log(data)
    const contract: Contract<ContractAbi> = await web3.contractPlugin.contract(contractAddress);
    console.log(await contract.methods.name().call())

    // web3.setProvider("https://bittorrent.drpc.org");
    // web3.contractPlugin.updateKey = "GCKCPDBKR7BW75P7HY5F7EA7BZRCITESY1";


    // const contract2 = await web3.contractPlugin.contract("0xc0f70509e091bdb3864ffbdd3daf8f16c0c6fd62");
    // console.log(await contract2.methods.name().call())

    // const pong = web3.contractPlugin.ping()
    // console.log(pong)
})()