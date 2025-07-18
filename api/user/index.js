// /api/user/index.js
if (!globalThis.users) {
  globalThis.users = [];
}
if (!globalThis.nextUserId) {
  globalThis.nextUserId = 1;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, balance, profile_picture, wallet_address, is_connected } = req.body;
    const newUser = {
      id: globalThis.nextUserId++,
      username: username || "Player",
      balance: balance || 100.0,
      profile_picture: profile_picture || "",
      wallet_address: wallet_address || null,
      is_connected: is_connected || false,
      can_claim_daily: true,
      next_claim_time: null,
      recentBets: [] // store as an array
    };
    globalThis.users.push(newUser);
    res.status(200).json(newUser);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
