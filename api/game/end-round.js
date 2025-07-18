// /api/game/end-round.js
if (!globalThis.users) {
  globalThis.users = [];
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { result_multiplier } = req.body;
  
    let bet_results = [];
    // For each user, process bets that haven't been resolved yet.
    globalThis.users.forEach(user => {
      if (user.recentBets) {
        user.recentBets.forEach(bet => {
          if (bet.result === null) {
            bet.result = result_multiplier;
            if (result_multiplier >= bet.target_multiplier) {
              bet.is_win = true;
              // For demonstration, payout equals bet_amount * target_multiplier.
              bet.win_amount = bet.bet_amount * bet.target_multiplier;
              user.balance += bet.win_amount;
            } else {
              bet.is_win = false;
            }
            bet_results.push(bet);
          }
        });
      }
    });
  
    // Generate a new nonce for the next round.
    const new_nonce = Math.floor(Math.random() * 1000);
    res.status(200).json({
      previous_seed: "dummy_previous_seed", // Replace as needed.
      nonce: new_nonce,
      bet_results
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
