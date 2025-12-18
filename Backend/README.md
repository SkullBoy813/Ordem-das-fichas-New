# Backend - Ordem das Fichas

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend com:

```env
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_secret_jwt_aqui
```

### Instalação

```bash
npm install
```

### Executar

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

## Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Fichas
- `GET /api/fichas` - Listar fichas do usuário
- `GET /api/fichas/:id` - Buscar ficha específica
- `POST /api/fichas` - Criar ficha
- `PUT /api/fichas/:id` - Atualizar ficha
- `PUT /api/fichas/:id/combate` - Atualizar combate (vida, sanidade, PE)
- `DELETE /api/fichas/:id` - Deletar ficha
- `POST /api/fichas/:id/habilidades` - Adicionar habilidade
- `DELETE /api/fichas/:id/habilidades/:habilidadeId` - Remover habilidade
- `POST /api/fichas/:id/rituais` - Adicionar ritual
- `DELETE /api/fichas/:id/rituais/:ritualId` - Remover ritual

### Habilidades
- `GET /api/habilidades` - Listar habilidades
- `POST /api/habilidades` - Criar habilidade

### Rituais
- `GET /api/rituais` - Listar rituais
- `POST /api/rituais` - Criar ritual

## CORS

O servidor está configurado para aceitar requisições de:
- http://localhost:5173 (Vite default)
- http://localhost:3000
- http://127.0.0.1:5173

## Autenticação

Todas as rotas (exceto auth) requerem um token JWT no header:
```
Authorization: Bearer <token>
```

