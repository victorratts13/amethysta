<center>
    <img src="./asset/img/amethysta.png" /> 
</center>

## Introduction
Library for validating smart contracts made on the Etherium Network. In order to facilitate the development of SmartContracts validation platforms, Amethysta is a great tool for Creating Explorers and Token Validators.

## Install

To install this library in your project, use NPM to download.

```bash
npm install amethysta
```

Then import this library in the root of your project

```js
/** 
 * If you download through git, 
 * import this library through the index.js route
*/
import Amethysta from "amethysta";
```

## Constructor

After the import, build the ``sapphire`` Request Object so that the class functions are presented.

```js
/** 
 *  If you want, you can configure
 *  some settings inside the builder,
 *  such as api version, schedule and protocol
*/
var sapphire = new Amethysta();

```

## Functions

Now it is possible to use the functions within the project in a simple way.

### GetSmartContract

Method that obtains the contents of a .sol smart contract to be validated. It will be parsed so that it can be read and interpreted by the validation algorithm.

```js
    var smart = await safir.GetSmartContract('./MetaContract.sol');

```

this return: 

```js
{
  type: 'SourceUnit',
  children: [
    {
      type: 'PragmaDirective',
      name: 'solidity',
      value: '>=0.7.0 <0.9.0'
    },
    {
      type: 'ContractDefinition',
      name: 'MetaContract',
      baseContracts: [],
      subNodes: [Array],
      kind: 'contract'
    }
  ]
}
```

### CheckSmartContract

this function checks the status of the previously made request, so that it can be confirmed if it is a valid request.

```js
    var smart = await safir.GetSmartContract('./MetaContract.sol');
    var locale = await safir.CheckSmartContract(smart);

```

### SendForRemix

This function verifies the contract with the Remix API where a verification is requested within the Etherium IPFS where it will return a Hash containing the request information, if it is successfully verified.

```js
var remix = await safir.SendForRemix(smart);
```

this return

```js
{
  Name: 'QmekfvjFTUq1n9Ku45c3aLXQfYPSSN81fLCRx2893B6oKL',
  Hash: 'QmekfvjFTUq1n9Ku45c3aLXQfYPSSN81fLCRx2893B6oKL',
  Size: '1372'
}
```