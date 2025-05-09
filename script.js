document.getElementById("formDenuncia").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const denuncia = document.getElementById("denuncia").value;

  fetch("/denuncia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, denuncia })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("confirmacao").textContent = data.message || "Denúncia enviada.";
      document.getElementById("formDenuncia").reset();
    })
    .catch(() => {
      document.getElementById("confirmacao").textContent = "Erro ao enviar denúncia.";
    });
});