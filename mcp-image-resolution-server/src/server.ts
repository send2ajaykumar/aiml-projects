import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as http from "http";

async function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res: http.IncomingMessage) => {
      let data = "";

      res.on("data", (chunk: Buffer) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON response: ${e}`));
        }
      });
    });

    req.on("error", (err: Error) => reject(err));
  });
}

// TODO: point this to your actual Image Resolution backend
const IMAGE_RESOLUTION_API_BASE = "http://localhost:8080"; // example

const server = new Server(
  {
    name: "image-resolution-mcp-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_image_resolution",
        description: "Get width and height of an image by URL or ID using the Image Resolution backend.",
        inputSchema: {
          type: "object",
          properties: {
            imageUrl: {
              type: "string",
              description: "Public URL of the image"
            }
          },
          required: ["imageUrl"]
        }
      },
      {
        name: "get_image_metadata",
        description: "Fetch metadata (width, height, format) for an image by ID.",
        inputSchema: {
            type: "object",
            properties: {
            id: { type: "number" }
            },
            required: ["id"]
        }
       }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_image_resolution") {
    const imageUrl = (args as any)?.imageUrl as string | undefined;

    if (!imageUrl) {
      return {
        content: [
          {
            type: "text",
            text: "Missing required argument: imageUrl"
          }
        ]
      };
    }

    try {
      // Example: call your backend API
      // Adjust path and query params to match your Image Resolution app
      const apiUrl = new URL("/api/image-resolution", IMAGE_RESOLUTION_API_BASE);
      apiUrl.searchParams.set("imageUrl", imageUrl);

      const responseBody = await httpGetJson(apiUrl.toString());

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseBody, null, 2)
          }
        ]
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error calling Image Resolution API: ${err?.message || String(err)}`
          }
        ]
      };
    }
  }

  if (request.params.name === "get_image_metadata") {
  const id = request.params.arguments?.id;
  const url = `http://localhost:8080/image/${id}/metadata`;

  try {
    const metadata = await fetchJson(url);
    return {
      content: [
        {
          type: "text",
          text: `Image ${id} metadata:\nWidth: ${metadata.width}\nHeight: ${metadata.height}\nFormat: ${metadata.format}`
        }
      ]
    };
  } catch (err: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching metadata: ${err.message}`
        }
      ]
    };
  }
}


  return {
    content: [
      {
        type: "text",
        text: `Unknown tool: ${name}`
      }
    ]
  };
});

// Simple HTTP GET helper returning JSON
function httpGetJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

// Start the MCP server over stdio
const transport = new StdioServerTransport();

server
  .connect(transport)
  .then(() => {
    console.error("Image Resolution MCP server is running (stdio).");
  })
  .catch((err: Error) => {
    console.error("Failed to start MCP server:", err);
    process.exit(1);
  });