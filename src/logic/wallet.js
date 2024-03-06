import Web3 from "web3";

const web3 = new Web3();

export const convertToEther = (balance) => {
    return web3.utils.fromWei(balance, "ether");
};