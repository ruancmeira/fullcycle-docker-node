# Desafio Full Cycle - Nginx com Node.js

Este projeto é uma solução para o desafio do curso Full Cycle especificamente sobre o módulo de Docker, que consiste em criar uma aplicação Node.js que registra dados em um banco MySQL e é acessível através de um proxy reverso Nginx.

## Estrutura do projeto

- **nginx**: Contém a configuração do servidor Nginx como proxy reverso
- **node**: Aplicação Node.js que insere registros no MySQL e exibe a lista de nomes
- **mysql**: Configurações e scripts de inicialização do banco de dados MySQL

## Componentes e Tecnologias

### Dockerize

O projeto utiliza o [Dockerize](https://github.com/jwilder/dockerize) para coordenar os containers e garantir que o serviço Node.js inicie apenas após o MySQL estar pronto para receber conexões.

No `docker-compose.yml`, o serviço Node.js é configurado com:

```yaml
command: dockerize -wait tcp://db:3306 -timeout 20s node src/index.js
```

Essa configuração faz com que:

1. O Dockerize aguarde o serviço MySQL estar disponível na porta 3306
2. Define um timeout de 20 segundos para essa espera
3. Executa o comando `node src/index.js` apenas quando o MySQL estiver pronto

### Configuração dos Serviços

- **Node.js**: Utiliza uma imagem Alpine com Dockerize instalado para reduzir o tamanho da imagem
- **MySQL**: Configurado para usar autenticação nativa e criar um banco de dados inicial chamado "nodedb"
- **Nginx**: Atua como proxy reverso, redirecionando as requisições para o serviço Node.js

## Como executar

Para iniciar a aplicação, basta executar:

```bash
docker-compose up -d
```

A aplicação inicia automaticamente na sequência correta: primeiro o MySQL, depois o Node.js (aguardando a disponibilidade do banco) e finalmente o Nginx.

Acesse a aplicação no navegador:

```
http://localhost:8080
```

## Funcionalidades

- A cada acesso, um nome aleatório é inserido no banco de dados
- A página exibe "Full Cycle Rocks!" seguido da lista de nomes cadastrados
- O acesso é feito através do Nginx na porta 8080, que funciona como proxy reverso para a aplicação Node.js
- O uso do Dockerize garante que a aplicação Node.js inicie apenas quando o banco de dados estiver pronto, evitando erros de conexão
