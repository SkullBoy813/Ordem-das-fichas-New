# Deploy do projeto Ordem das Fichas

## Backend (Node/Express)

1. Criar `.env` em `Backend/` a partir de `.env.example`:
   - `PORT=3000`
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
   - `CORS_ORIGINS=http://localhost:5173,http://localhost:3000,https://seu-front.vercel.app`

2. Instalar dependências e rodar local:
   - `cd Backend && npm install`
   - `npm run dev` (desenvolvimento) ou `npm start` (produção)

3. Deploy em Railway/Render/Heroku:
   - Defina variáveis de ambiente idênticas.
   - Use `npm start` como comando de produção.

4. Validar rota:
   - `GET https://seu-backend-url/api/ping`

---

## Frontend (Vite/React)

1. Criar `.env` em `Frontend/` a partir de `.env.example`:
   - `VITE_API_URL=https://seu-backend-url`

2. Instalar dependências:
   - `cd Frontend && npm install`

3. Build e preview:
   - `npm run build`
   - `npm run preview`

4. Deploy (Vercel / Netlify / Cloudflare Pages):
   - Root: `Frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Variable: `VITE_API_URL=https://seu-backend-url`

---

## Exemplo Vercel

- Selecionar projeto `Frontend`.
- `Environment Variables`:
  - `VITE_API_URL=https://seu-backend-url`

## Exemplo Railway

- Criar app Node.
- Branch: main.
- `Build command`: `npm install && npm run build` (se quiser usar frontend integrado) ou apenas Backend no diretório `Backend`.
- `Start command`: `npm start`
- Configurar `CORS_ORIGINS` igual ao frontend.

---

## Observações importantes

- O backend exige JWT em rotas privadas: `Authorization: Bearer <token>`.
- CORS agora usa `CORS_ORIGINS`, útil para produção.
- Frontend usa `VITE_API_URL` para não ficar com `localhost` fixo.
