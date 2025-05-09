require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/denuncia", async (req, res) => {
  const { nome, denuncia } = req.body;

  if (!denuncia) {
    return res.status(400).json({ error: "Campo denúncia obrigatório" });
  }

  const payload = {
    content: `📢 **Nova Denúncia Recebida**\n👤 **Nome:** ${nome || "Anônimo"}\n📝 **Denúncia:** ${denuncia}`
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Erro no envio para Discord");

    res.status(200).json({ message: "Denúncia enviada com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar denúncia:", error);
    res.status(500).json({ error: "Erro ao processar denúncia" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});