// /api/wallet/verify.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // In production, verify the signature using a crypto library.
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
