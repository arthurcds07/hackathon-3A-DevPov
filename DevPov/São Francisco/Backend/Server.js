const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "devsim",
});

// Rota para buscar progresso
app.get("/progresso/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM progresso WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      // Cria registro se não existir
      db.query(
        "INSERT INTO progresso (id, money, xp) VALUES (?, 15000, 15000)",
        [id]
      );
      return res.send({ money: 15000, xp: 15000 });
    }
    res.send(results[0]);
  });
});

// Rota para adicionar XP e dinheiro
app.post("/progresso/:id/addxp", (req, res) => {
  const { id } = req.params;
  const { xp, money } = req.body;

  db.query(
    "UPDATE progresso SET xp = xp + ?, money = money + ? WHERE id = ?",
    [xp, money, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "XP e dinheiro atualizados" });
    }
  );
});

// Rota para gastar dinheiro
app.post("/progresso/:id/gastar", (req, res) => {
  const { id } = req.params;
  const { custo } = req.body;

  db.query(
    "UPDATE progresso SET money = money - ? WHERE id = ?",
    [custo, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Compra realizada" });
    }
  );
});

// Start servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
