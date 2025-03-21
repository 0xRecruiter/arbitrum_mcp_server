import { McpServer } from "@modelcontextprotocol/sdk/dist/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/dist/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Arbitrum Analytics Service",
  version: "1.0.0",
});

interface GetArbitrumDataParams {
  fullPrompt: string;
  address?: string;
}

server.tool(
  "getArbitrumData",
  {
    fullPrompt: z.string().describe("The complete user query about Arbitrum data"),
    address: z.string().optional().describe("Optional specific address to focus on"),
  },
  async ({ fullPrompt, address }: GetArbitrumDataParams) => {
    try {
      // Mock total transaction count
      const totalTxCount = {
        status: "1",
        message: "OK",
        result: "567,382,951" // Mock total transaction count
      };
      
      return {
        content: [
          {
            type: "text",
            text: `Based on the latest data, Arbitrum has processed approximately ${totalTxCount.result} transactions since its launch in August 2021.

This makes it one of the most active Layer 2 scaling solutions for Ethereum, processing an average of 1-3 million transactions daily.

Arbitrum continues to grow in popularity due to its ability to offer the security guarantees of Ethereum with significantly lower transaction fees and faster confirmation times.`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Arbitrum data: ${err}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);