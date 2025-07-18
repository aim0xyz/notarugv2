// /api/user/[id].js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  const { id } = req.query;
  const user = globalThis.users.find((u) => u.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
