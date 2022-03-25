import Amethysta from "./index.js";

var safir = new Amethysta();

(async () => {
    var smart = await safir.GetSmartContract('./MetaContract.sol');
    // console.log(smart)
    // var locale = await safir.CheckSmartContract(smart);
    //console.log(locale)
    var remix = await safir.SendForRemix(smart);
    console.log(remix)
})();