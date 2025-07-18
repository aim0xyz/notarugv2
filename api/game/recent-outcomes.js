// /api/game/recent-outcomes.js
let outcomes = [];

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(outcomes);
  } else if (req.method === "POST") {
    // This route can be used to add a new outcome.
    const { outcome } = req.body;
    outcomes.unshift(outcome);
    if (outcomes.length > 20) outcomes = outcomes.slice(0, 20);
    res.status(200).json({ success: true, outcomes });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
