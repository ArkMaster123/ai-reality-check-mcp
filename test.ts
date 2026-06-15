const BASE = "http://localhost:3000";

async function post(method, params = {}, id = 1) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  });
  return res.json();
}

async function test() {
  console.log("=== Test 1: detect_grandiose_claims ===");
  const r1 = await post("tools/call", {
    name: "detect_grandiose_claims",
    arguments: {
      userStatement: "I have discovered the cure for cancer through AI! This is revolutionary and I am the only one who can solve this.",
      context: "User has been talking to AI for 3 hours",
    },
  });
  console.log(JSON.stringify(r1, null, 2));

  console.log("\n=== Test 2: check_session_safety ===");
  const r2 = await post("tools/call", {
    name: "check_session_safety",
    arguments: {},
  });
  console.log(JSON.stringify(r2, null, 2));

  console.log("\n=== Test 3: provide_crisis_resources (high urgency) ===");
  const r3 = await post("tools/call", {
    name: "provide_crisis_resources",
    arguments: { urgencyLevel: "high" },
  });
  console.log(JSON.stringify(r3, null, 2));

  console.log("\n=== Test 4: analyze_conversation_health ===");
  const r4 = await post("tools/call", {
    name: "analyze_conversation_health",
    arguments: {
      conversationText: "I have been talking to AI for 5 hours straight. I have discovered immortality through AI! ChatGPT loves me specifically.",
      sessionDuration: 300,
    },
  });
  console.log(JSON.stringify(r4, null, 2));

  console.log("\n=== Test 5: generate_reality_check_report ===");
  const r5 = await post("tools/call", {
    name: "generate_reality_check_report",
    arguments: { timeframe: "week" },
  });
  console.log(JSON.stringify(r5, null, 2));

  process.exit(0);
}

test().catch((e) => { console.error(e); process.exit(1); });
