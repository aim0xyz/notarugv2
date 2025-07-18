// /api/game/start-round.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Generate dummy seeds and nonce.
    const server_seed = crypto.randomUUID();    
    const server_seed_hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(server_seed))
      .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join(""));
    const client_seed = crypto.randomUUID();
    const nonce = Math.floor(Math.random() * 1000);
  
    // In real use, store these details persistently.
    res.status(200).json({
      round_id: Date.now(), // dummy round id
      server_seed_hash,
      client_seed,
      nonce
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
