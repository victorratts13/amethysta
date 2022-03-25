/**
 * Amethysta
 * version: 1.0
 * author: victor ratts
 * lisence: MIT
 */
import parser from "@solidity-parser/parser";
import fs from "fs";
import api from "./api/smart.api.js";
import qs from "qs";
import FormData from "form-data";

class Amethysta {
    constructor(config = {
        api: 'v1',
        schedule: 'pure',
        protocol: 'erc20'
    }) {
        this.config = config;
    }

    GetSmartContract(filePath = '') {
        return new Promise(async (resolve, reject) => {
            try {
                var strem = fs.openSync(filePath);
                const data = fs.readFileSync(filePath, 'utf8')
                var ast = parser.parse(data.toString())
                fs.close(strem)
                return resolve(ast)
            } catch (e) {
                return reject({
                    status: 'error',
                    description: e.message
                })
            }
            // var strem = fs.openSync(filePath);
            // //console.log(strem)
            // fs.readFile(filePath, (err, data) => {
            //     if (err) {
            //         return reject({
            //             status: 'error',
            //             description: error
            //         })
            //     } else {
            //         try {
            //             var ast = parser.parse(data.toString())
            //             return resolve(ast)
            //         } catch (e) {
            //             return reject({
            //                 status: 'error',
            //                 description: e.message
            //             })
            //         }
            //     }
            // })

            // fs.close(strem)
        })
    }

    CheckSmartContract(content = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                parser.visit(content, {
                    ImportDirective: function (node) {
                        return resolve(node)
                    }
                })
            } catch (e) {
                return reject(e.message)
            }
        })
    }

    PrepareSmartContract(protocol) {

    }

    SendForRemix(SmartContract) {
        return new Promise(async (resolve, reject) => {
            //var test = {"compiler":{"version":"0.5.17+commit.d19bba13"},"language":"Solidity","output":{"abi":[{"constant":true,"inputs":[{"internalType":"uint256","name":"_a","type":"uint256"},{"internalType":"uint256","name":"_b","type":"uint256"}],"name":"soma","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"MetaContract.sol":"MetaContract"},"evmVersion":"istanbul","libraries":{},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"MetaContract.sol":{"keccak256":"0xe7aef7ea2c931118a1fcef0a40bfb009f0002bce246bbab1ae66b422fbfe77ce","urls":["bzz-raw://6dbb2d926d943cbe365fa0d8f779337f99d08567723a6236d9ff17dd0aee3c1b","dweb:/ipfs/QmVWAFX99oCDd4wUTrDJ8Qq1ofN6EJW2BKCcvi2Kv8yhaE"]}},"version":1}
            var fd = new FormData();
            fd.append("path", JSON.stringify(SmartContract))
            // console.log(fd.getHeaders())
            api.post('/api/v0/add?pin=true', fd, {headers: fd.getHeaders()}).then(data => {
                return resolve(data.data)
            }).catch(e => {
                return reject(e)
            })
        })
    }

    CheckSmartStatus(RemixOutput) {
        return new Promise(async (resolve, reject) => {

        })
    }

    CheckContractStatus(SmartContract = {}) {
        return new Promise(async (resolve, reject) => {
            var pragma = {
                status: '',
                name: '',
                contract: '',
                pragma: '',
                kind: '',
                metaBase: '',
                extraInfo: []
            };
            for (var smart of SmartContract.children ?? []) {
                if (smart.name == 'solidity') {
                    pragma.status = 'success'
                    pragma.name = 'solidity SmartContract (.sol)'
                }
            }


        })
    }
}

export default Amethysta;