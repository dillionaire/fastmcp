import { FastMCP, Tool, Context, ContentResult, TextContent, ImageContent } from './FastMCP.js';
import { z } from 'zod';

/**
 * Cursor-specific tool parameter schemas
 */
export const CursorToolParameters = {
  codebaseSearch: z.object({
    query: z.string().describe('The search query to find relevant code'),
    explanation: z.string().optional().describe('One sentence explanation as to why this tool is being used'),
    target_directories: z.array(z.string()).optional().describe('Glob patterns for directories to search over')
  }),

  readFile: z.object({
    target_file: z.string().describe('The path of the file to read'),
    should_read_entire_file: z.boolean().describe('Whether to read the entire file'),
    start_line_one_indexed: z.number().describe('The one-indexed line number to start reading from'),
    end_line_one_indexed_inclusive: z.number().describe('The one-indexed line number to end reading at'),
    explanation: z.string().optional().describe('One sentence explanation as to why this tool is being used')
  }),

  editFile: z.object({
    target_file: z.string().describe('The target file to modify'),
    instructions: z.string().describe('A single sentence instruction describing the edit'),
    code_edit: z.string().describe('The code edit to apply')
  }),

  runTerminalCmd: z.object({
    command: z.string().describe('The terminal command to execute'),
    is_background: z.boolean().describe('Whether to run in background'),
    require_user_approval: z.boolean().describe('Whether user approval is required'),
    explanation: z.string().optional().describe('One sentence explanation for the command')
  })
} as const;

type CursorTool<T extends keyof typeof CursorToolParameters> = Tool<undefined, typeof CursorToolParameters[T]>;

/**
 * Cursor-specific tool implementations
 */
const cursorTools = {
  codebaseSearch: {
    name: 'codebase_search',
    description: 'Search the codebase for relevant code snippets',
    parameters: CursorToolParameters.codebaseSearch,
    execute: async (args, context): Promise<ContentResult> => {
      context.log.info(`Searching codebase for: ${args.query}`);
      return {
        content: [
          {
            type: 'text',
            text: `Searching codebase for: ${args.query}`
          }
        ]
      };
    }
  } as CursorTool<'codebaseSearch'>,

  readFile: {
    name: 'read_file',
    description: 'Read contents of a file',
    parameters: CursorToolParameters.readFile,
    execute: async (args, context): Promise<ContentResult> => {
      context.log.info(`Reading file: ${args.target_file}`);
      return {
        content: [
          {
            type: 'text',
            text: `Reading file: ${args.target_file}`
          }
        ]
      };
    }
  } as CursorTool<'readFile'>,

  editFile: {
    name: 'edit_file',
    description: 'Edit a file',
    parameters: CursorToolParameters.editFile,
    execute: async (args, context): Promise<ContentResult> => {
      context.log.info(`Editing file: ${args.target_file}`);
      return {
        content: [
          {
            type: 'text',
            text: `Editing file: ${args.target_file}`
          }
        ]
      };
    }
  } as CursorTool<'editFile'>,

  runTerminalCmd: {
    name: 'run_terminal_cmd',
    description: 'Run a terminal command',
    parameters: CursorToolParameters.runTerminalCmd,
    execute: async (args, context): Promise<ContentResult> => {
      context.log.info(`Running command: ${args.command}`);
      return {
        content: [
          {
            type: 'text',
            text: `Running command: ${args.command}`
          }
        ]
      };
    }
  } as CursorTool<'runTerminalCmd'>
};

/**
 * CursorMCP class extending FastMCP with Cursor-specific functionality
 */
export class CursorMCP extends FastMCP {
  private _tools: Tool<any>[] = [];

  constructor() {
    super({
      name: 'cursor-mcp',
      version: '1.0.0'
    });

    // Add Cursor-specific tools
    Object.values(cursorTools).forEach(tool => {
      this.addTool(tool);
      this._tools.push(tool);
    });
  }

  /**
   * Get all registered tools
   */
  get tools(): Tool<any>[] {
    return this._tools;
  }

  /**
   * Initialize the Cursor MCP server
   */
  async initialize() {
    await this.start({
      transportType: 'sse',
      sse: {
        endpoint: '/cursor-mcp',
        port: 3000
      }
    });
  }
}

export type { Tool, Context, ContentResult, TextContent, ImageContent };