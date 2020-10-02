import express from 'express';

import authController from './routes/authController';
import projectController from './routes/projectController';

const app = express();

app.use(express.json());

// importando as rotas
app.use(authController);
app.use(projectController);

app.listen(3000, () => {
    console.log('Server running in port 3000!')
}); 