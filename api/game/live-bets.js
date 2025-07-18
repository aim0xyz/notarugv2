// /api/game/live-bets.js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  let liveBets = [];
  globalThis.users.forEach(user => {
    if (user.recentBets) {
      liveBets = liveBets.concat(user.recentBets);
    }
  });
  res.status(200).json(liveBets);
}
