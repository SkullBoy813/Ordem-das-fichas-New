const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const parts = authHeader.split(' ');
        
        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Formato de token inválido' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Formato de token inválido' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET não configurado!');
            return res.status(500).json({ error: 'Erro de configuração do servidor' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expirado' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido' });
        }
        console.error('Erro no middleware de autenticação:', err);
        return res.status(401).json({ error: 'Erro ao autenticar' });
    }
};