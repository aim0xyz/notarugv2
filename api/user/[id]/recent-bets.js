// /api/user/[id]/recent-bets.js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  const { id } = req.query;
  const user = globalThis.users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user.recentBets || []);
}
