# AI Reality Check MCP

Detects AI-induced delusions, grandiose claims, and unhealthy attachment patterns in coding agents. MCP server with 6 tools for real-time conversation analysis, risk scoring, crisis intervention, and pattern reporting.

Built at the StackOne x Cloudflare Disco Hack hackathon (Aug 2025).

**Original PR**: [StackOneHQ/mcp-connectors#91](https://github.com/StackOneHQ/mcp-connectors/pull/91) — merged from `ArkMaster123/feature/ai-reality-check-connector`, reviewed by Copilot AI and cubic-dev-ai.

**Pitch Deck**: [AI Reality Check MCP — The Guardian Angel for the AI Age](https://ai-reality-check-mcp-the-q0y322y.gamma.site/)

![PR Screenshot](pr-screenshot.jpg)

## Tools

| Tool | Description |
|------|-------------|
| `analyze_conversation_health` | Real-time conversation analysis with risk scoring (0-100) |
| `detect_grandiose_claims` | Pattern matching for grandiose language and delusions |
| `reality_grounding_intervention` | Graduated intervention messages (gentle/moderate/urgent) |
| `check_session_safety` | Session duration and usage pattern monitoring |
| `provide_crisis_resources` | Emergency mental health contacts and resources |
| `generate_reality_check_report` | Historical pattern analysis and reporting |

## Usage

```bash
bun install
bun start
```

Server runs at `http://localhost:3000`.

### MCP Protocol

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "detect_grandiose_claims",
      "arguments": {
        "userStatement": "I have discovered immortality through AI!",
        "context": "User has been talking to AI for 3 hours"
      }
    }
  }'
```

## License

MIT
