// /api/user/[id]/claim-daily.js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.query;
    const user = globalThis.users.find(u => u.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.can_claim_daily) {
      return res.status(400).json({ error: "Daily claim unavailable yet" });
    }
    const bonus = 100;
    user.balance += bonus;
    user.can_claim_daily = false;
    user.next_claim_time = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    res.status(200).json({ success: true, claimed_amount: bonus, user });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
