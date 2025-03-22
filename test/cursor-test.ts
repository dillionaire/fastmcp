import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CursorMCP } from '../src/CursorMCP.js';

describe('CursorMCP', () => {
  let mcp: CursorMCP;

  beforeAll(async () => {
    mcp = new CursorMCP();
    await mcp.initialize();
  });

  afterAll(async () => {
    await mcp.stop();
  });

  it('should have all required tools registered', () => {
    const tools = mcp.tools;
    expect(tools).toHaveLength(4);
    
    const toolNames = tools.map(t => t.name);
    expect(toolNames).toContain('codebase_search');
    expect(toolNames).toContain('read_file');
    expect(toolNames).toContain('edit_file');
    expect(toolNames).toContain('run_terminal_cmd');
  });

  it('should execute codebase search', async () => {
    const result = await mcp.executeToolByName('codebase_search', {
      query: 'test query',
      target_directories: ['src']
    });

    expect(result).toBeDefined();
    expect(result.content[0].type).toBe('text');
  });

  it('should execute file read', async () => {
    const result = await mcp.executeToolByName('read_file', {
      target_file: 'test/cursor-test.ts',
      should_read_entire_file: false,
      start_line_one_indexed: 1,
      end_line_one_indexed_inclusive: 10
    });

    expect(result).toBeDefined();
    expect(result.content[0].type).toBe('text');
  });

  it('should execute file edit', async () => {
    const result = await mcp.executeToolByName('edit_file', {
      target_file: 'test/test-file.txt',
      instructions: 'Add test line',
      code_edit: 'Test content'
    });

    expect(result).toBeDefined();
    expect(result.content[0].type).toBe('text');
  });

  it('should execute terminal command', async () => {
    const result = await mcp.executeToolByName('run_terminal_cmd', {
      command: 'echo "test"',
      is_background: false,
      require_user_approval: true
    });

    expect(result).toBeDefined();
    expect(result.content[0].type).toBe('text');
  });
});