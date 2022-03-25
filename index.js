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

    SendForRemix(SmartContract) {
        return new Promise(async (resolve, reject) => {
            var fd = new FormData();
            fd.append("path", JSON.stringify(SmartContract))
            api.post('/api/v0/add?pin=true', fd, {headers: fd.getHeaders()}).then(data => {
                return resolve(data.data)
            }).catch(e => {
                return reject(e)
            })
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