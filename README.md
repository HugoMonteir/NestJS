# Documentação da API

Este projeto é uma API criada usando **NestJS**, integrada com o banco de dados **PostgreSQL**, com suporte para logging, Swagger e tratamento estruturado de exceções.

## Requisitos

- **Node.js** (v16+)
- **npm**

## Tecnologias Utilizadas

- **NestJS** como o framework principal para construção da API.
- **TypeORM** para gerenciamento de banco de dados e migrações.
- **PostgreSQL** para persistência de dados.
- **Swagger** para documentação dos endpoints da API.
- **Class-Validator** e **Class-Transformer** para validação e transformação de DTOs.
- **Prettier** e **ESLint** para qualidade de código.

## Estrutura do Projeto

```bash
src
├── app.module.ts        # Módulo raiz da aplicação
├── main.ts              # Ponto de entrada da aplicação
├── common               # Utilitários, constantes e interfaces comuns
│   ├── constants        # Constantes globais da aplicação
│   ├── docs             # Configuração da documentação Swagger
│   ├── interfaces       # Interfaces compartilhadas
│   └── utils            # Funções utilitárias
├── configs              # Arquivos de configuração da aplicação (ex.: servidor, banco de dados)
├── exceptions           # Filtros e exceções personalizadas
├── middlewares          # Middlewares da aplicação
├── modules              # Módulos específicos da aplicação
│   └── game             # Exemplo: Módulo de jogos
│       ├── dto          # Data Transfer Objects para o módulo
│       ├── entities     # Entidades do banco de dados
│       ├── interfaces   # Interfaces específicas do módulo
│       ├── game.controller.ts # Endpoints específicos para jogos
│       ├── game.service.ts    # Lógica de negócios para jogos
│       ├── game.module.ts     # Configuração do módulo de jogos
│       └── game.subscriber.ts # Eventos do banco de dados para jogos
└── tests                # Testes unitários e e2e
```

## Variáveis de Ambiente

A aplicação espera as seguintes variáveis de ambiente configuradas em um arquivo `.env`:

```env
NODE_ENV=development|production

CORS_ORIGIN=url|*
PORT=number

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
DATABASE_MIGRATIONS_RUN=boolean
DATABASE_SYNCHRONIZE=boolean
```

## Endpoints

### Gerenciamento de Jogos

#### Listar Todos os Jogos
- **GET** `/games`
- **Descrição**: Retorna uma lista de todos os jogos.
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "name": "Elden Ring",
      "description": null,
      "genre": "RPG",
      "platform": "PC"
    },
    {
      "id": 5,
      "name": "Cyberpunk 2077",
      "description": "Um RPG de mundo aberto em um futuro distópico.",
      "genre": "RPG",
      "platform": "PC"
    }
  ]
  ```

#### Obter Jogo por ID
- **GET** `/games/:id`
- **Descrição**: Retorna os detalhes de um jogo específico.
- **Resposta:**
  ```json
  {
    "id": 1,
    "name": "Elden Ring",
    "description": null,
    "genre": "RPG",
    "platform": "PC"
  }
  ```

#### Criar um Jogo
- **POST** `/games`
- **Descrição**: Cria um novo jogo.
- **Corpo da Requisição:**
  ```json
  {
    "name": "string",
    "description": "string (Optional)",
    "genre": "string",
    "platform": "string"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 1,
    "name": "string",
    "description": "string (Optional)",
    "genre": "string",
    "platform": "string"
  }
  ```

#### Atualizar um Jogo
- **PUT** `/games/:id`
- **Descrição**: Atualiza um jogo existente.
- **Corpo da Requisição:**
  ```json
  {
    "name": "string",
    "description": "string (Optional)",
    "genre": "string",
    "platform": "string"
  }
  ```
  - **Resposta:**
  ```json
  {
    "id": 1,
    "name": "string",
    "description": "string (Optional)",
    "genre": "string",
    "platform": "string"
  }
  ```
  
#### Atualizar um Jogo (Parcial)
- **PATCH** `/games/:id`
- **Descrição**: Atualiza um jogo existente parcialmente.
- **Corpo da Requisição:**
  ```json
  {
    "name": "string (Optional)",
    "description": "string (Optional)",
    "genre": "string (Optional)",
    "platform": "string (Optional)"
  }
  ```
  - **Resposta:**
  ```json
  {
    "id": 1,
    "name": "string (Optional)",
    "description": "string (Optional)",
    "genre": "string (Optional)",
    "platform": "string (Optional)"
  }
  ```

#### Excluir um Jogo
- **DELETE** `/games/:id`
- **Descrição**: Exclui um jogo por ID.
- **Resposta:** 204 - No Content

## Documentação Swagger

A documentação da API está disponível via Swagger na seguinte URL:

- **URL**: [http://localhost:3000/api](http://localhost:3000/api)

## Instalação e Execução do Projeto

### Instalar Dependências
```bash
npm install
```

### Executar o Projeto em Ambiente de Desenvolvimento
```bash
npm run start:dev
```

### Executar Lint do projeto
```bash
npm run lint
```

### Executar Testes
```bash
npm run test
```