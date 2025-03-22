import { CursorMCP } from '../src/CursorMCP';
import { describe, it, expect } from 'vitest';

describe('CursorMCP Integration Test', () => {
  it('should initialize and handle Cursor-specific tools', async () => {
    const mcp = new CursorMCP();
    
    // Test codebase search
    const searchResult = await mcp.tools.find(t => t.name === 'codebase_search')?.execute({
      query: 'test query',
      target_directories: ['src']
    }, {
      session: undefined,
      reportProgress: async () => {},
      log: {
        debug: () => {},
        error: () => {},
        info: () => {},
        warn: () => {}
      }
    });

    expect(searchResult).toBeDefined();
    expect(searchResult?.content[0].type).toBe('text');

    // Test file reading
    const readResult = await mcp.tools.find(t => t.name === 'read_file')?.execute({
      target_file: 'test/cursor-test.ts',
      should_read_entire_file: true,
      start_line_one_indexed: 1,
      end_line_one_indexed_inclusive: 10
    }, {
      session: undefined,
      reportProgress: async () => {},
      log: {
        debug: () => {},
        error: () => {},
        info: () => {},
        warn: () => {}
      }
    });

    expect(readResult).toBeDefined();
    expect(readResult?.content[0].type).toBe('text');

    // Test file editing
    const editResult = await mcp.tools.find(t => t.name === 'edit_file')?.execute({
      target_file: 'test/test-file.txt',
      instructions: 'Add a test line',
      code_edit: 'Test content'
    }, {
      session: undefined,
      reportProgress: async () => {},
      log: {
        debug: () => {},
        error: () => {},
        info: () => {},
        warn: () => {}
      }
    });

    expect(editResult).toBeDefined();
    expect(editResult?.content[0].type).toBe('text');

    // Test terminal command
    const cmdResult = await mcp.tools.find(t => t.name === 'run_terminal_cmd')?.execute({
      command: 'echo "test"',
      is_background: false,
      require_user_approval: true
    }, {
      session: undefined,
      reportProgress: async () => {},
      log: {
        debug: () => {},
        error: () => {},
        info: () => {},
        warn: () => {}
      }
    });

    expect(cmdResult).toBeDefined();
    expect(cmdResult?.content[0].type).toBe('text');
  });
});