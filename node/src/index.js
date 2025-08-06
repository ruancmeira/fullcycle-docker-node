const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(config);

    const names = [
      "Maria",
      "João",
      "Pedro",
      "Ana",
      "Carlos",
      "Mariana",
      "Lucas",
      "Julia",
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];

    await connection.execute("INSERT INTO people(name) VALUES(?)", [
      randomName,
    ]);

    const [rows] = await connection.query(
      "SELECT id, name, created_at FROM people"
    );

    await connection.end();

    let html = "<h1>Full Cycle Rocks!</h1>\n";
    html += "<ul>";

    rows.forEach((row) => {
      const date = new Date(row.created_at).toLocaleString("pt-BR");
      html += `<li>ID: ${row.id} | Nome: ${row.name} | Data: ${date}</li>`;
    });

    html += "</ul>";

    res.send(html);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao acessar o banco de dados");
  }
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
