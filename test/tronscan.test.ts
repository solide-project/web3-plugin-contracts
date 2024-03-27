import { getSource } from "../src";
import { ChainID } from "../src/chains";

describe("Tronscan Tests", () => {
    it("should register TemplatePlugin plugin on Web3Context instance", async () => {
        // Arrange
        const chainId = ChainID.TRON_MAINNET;
        const contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        // Act
        const source = await getSource(contract, {
            chainId: chainId,
        });
        console.log(source)

        // Assert
        // expect(source).toBeDefined();
    });
});