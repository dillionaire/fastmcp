# FastMCP for Cursor

A TypeScript framework for building Model Context Protocol (MCP) servers, specifically adapted for Cursor integration.

## Features

- Full MCP protocol implementation
- Cursor-specific tools and integrations
- TypeScript support with full type safety
- Easy-to-use API for building MCP servers
- Built-in support for SSE (Server-Sent Events)

## Installation

```bash
npm install fastmcp-cursor
```

## Quick Start

```typescript
import { CursorMCP } from 'fastmcp-cursor';

// Create a new CursorMCP instance
const mcp = new CursorMCP();

// Initialize the server
await mcp.initialize();
```

## Cursor Tools

The framework provides several Cursor-specific tools out of the box:

- `codebaseSearch`: Search the codebase for relevant code snippets
- `readFile`: Read contents of a file
- `editFile`: Edit a file
- `runTerminalCmd`: Run terminal commands

## Custom Tools

You can add custom tools to extend the functionality:

```typescript
import { CursorMCP, Tool } from 'fastmcp-cursor';
import { z } from 'zod';

const customTool: Tool = {
  name: 'custom_tool',
  description: 'A custom tool implementation',
  parameters: z.object({
    param1: z.string(),
    param2: z.number()
  }),
  execute: async (args, context) => {
    // Tool implementation
    return {
      content: [
        {
          type: 'text',
          text: 'Custom tool result'
        }
      ]
    };
  }
};

const mcp = new CursorMCP();
mcp.addTool(customTool);
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run tests: `npm test`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT