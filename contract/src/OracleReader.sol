
import { ISelfKisser, IChronicle } from "./interface/ChronicleOracleInterface.sol";

abstract contract OracleReader {

    // Self Kisser from Chronicle Oracle
    ISelfKisser public selfKisser;
    IChronicle chronicle;

    constructor (
        address selfKisserAddress,
        address chronicleOracleAddress_ETH_USD
    ) {
        // Chronicle Oracle
        selfKisser = ISelfKisser(selfKisserAddress);
        chronicle = IChronicle(address(chronicleOracleAddress_ETH_USD));

        // Whitelist the token address
        selfKisser.selfKiss(address(chronicle));
    }

    function readUSDPriceFromETH() internal view returns (uint256 val) {
        val = chronicle.read();
    }

}