// /api/game/place-bet.js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, bet_amount, target_multiplier } = req.body;
    const user = globalThis.users.find(u => u.id === parseInt(user_id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (bet_amount > user.balance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    // Deduct the bet amount.
    user.balance -= bet_amount;
    // Create a bet object.
    const bet = {
      bet_id: Date.now() + Math.floor(Math.random() * 1000),
      bet_amount,
      target_multiplier,
      result: null,
      is_win: null,
      win_amount: 0
    };
    // Save the bet in the user's recent bets.
    if (!user.recentBets) user.recentBets = [];
    user.recentBets.unshift(bet);
    if (user.recentBets.length > 10) user.recentBets.pop();
    res.status(200).json({ new_balance: user.balance, bet_id: bet.bet_id });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
