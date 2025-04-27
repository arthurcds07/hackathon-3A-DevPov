const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'devsim'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

app.use(cors());

// Rota para pegar o progresso do jogador
app.get('/progresso/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT money, xp FROM progresso WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar progresso:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Jogador não encontrado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para atualizar XP e Dinheiro
app.post('/progresso/:id', (req, res) => {
  const id = req.params.id;
  const { money, xp } = req.body;

  db.query('UPDATE progresso SET money = ?, xp = ? WHERE id = ?', [money, xp, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Progresso atualizado com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});