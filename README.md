# Desafio Full Cycle - Nginx com Node.js

Este projeto é uma solução para o desafio do curso Full Cycle especificamente sobre o módulo de Docker, que consiste em criar uma aplicação Node.js que registra dados em um banco MySQL e é acessível através de um proxy reverso Nginx.

## Estrutura do projeto

- **nginx**: Contém a configuração do servidor Nginx como proxy reverso
- **node**: Aplicação Node.js que insere registros no MySQL e exibe a lista de nomes
- **mysql**: Configurações e scripts de inicialização do banco de dados MySQL

## Como executar

Para iniciar a aplicação, basta executar:

```bash
docker-compose up -d
```

Após iniciar a aplicação aguarde um instante para acessar pois o banco de dados demora um pouco para levantar.

Acesse a aplicação no navegador:

```
http://localhost:8080
```

## Funcionalidades

- A cada acesso, um nome aleatório é inserido no banco de dados
- A página exibe "Full Cycle Rocks!" seguido da lista de nomes cadastrados
- O acesso é feito através do Nginx na porta 8080, que funciona como proxy reverso para a aplicação Node.js
