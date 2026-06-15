import { AIRealityCheckConnectorConfig } from './ai-reality-check';

const connector = AIRealityCheckConnectorConfig;
const tools = connector.tools;

const toolList = Object.entries(tools).map(([key, tool]) => ({
  name: tool.name,
  description: tool.description,
  inputSchema: tool.schema,
  key,
}));

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.method === 'GET') {
      return new Response(JSON.stringify({
        server: 'ai-reality-check-mcp',
        version: '1.0.0',
        tools: toolList.map(({ key, ...rest }) => rest),
      }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const body = await req.json();

      if (body.method === 'tools/list') {
        return new Response(JSON.stringify({
          jsonrpc: '2.0',
          id: body.id,
          result: {
            tools: toolList.map(({ key, ...rest }) => rest),
          },
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (body.method === 'tools/call') {
        const toolName = body.params.name;
        const toolEntry = toolList.find(t => t.name === toolName);

        if (!toolEntry) {
          return new Response(JSON.stringify({
            jsonrpc: '2.0',
            id: body.id,
            error: { code: -32601, message: `Tool not found: ${toolName}` },
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const result = await tools[toolEntry.key].handler(body.params.arguments, {
          getSetup: async () => ({}),
          getData: async () => null,
          setData: async () => {},
        });

        return new Response(JSON.stringify({
          jsonrpc: '2.0',
          id: body.id,
          result: { content: [{ type: 'text', text: result }] },
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        id: body.id,
        error: { code: -32601, message: `Method not found: ${body.method}` },
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not found', { status: 404 });
  },
});

console.log(`AI Reality Check MCP running at http://localhost:${server.port}/mcp`);
console.log(`Tools available: ${toolList.length}`);
