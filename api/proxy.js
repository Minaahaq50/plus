export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing ?url parameter" });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

    res.send(Buffer.from(data));
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
