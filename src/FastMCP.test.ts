// ... existing code ...

it('blocks unauthorized requests', async () => {
  const port = await getPort();
  const server = new FastMCP({
    name: 'test',
    version: '1.0.0',
  });

  await server.start({
    transportType: 'sse',
    sse: {
      endpoint: '/sse',
      port,
      auth: () => false,
    },
  });

  const client = new Client({
    name: 'test',
    version: '1.0.0',
  });

  const transport = new SSEClientTransport(
    new URL(`http://localhost:${port}/sse`),
  );

  await expect(client.connect(transport)).rejects.toThrow("SSE error: Non-200 status code (401)");
});

// ... existing code ...