import { Router } from 'express'; 
import authMiddlewares from '../middlewares/auth';

const projectController = Router(); 

// middleware que só fara a rota debaixo se passar no authMiddlewares que no caso é pegar o token do usuario
projectController.use(authMiddlewares);

projectController.get('/', (request, response) => { 

    return response.json({message: 'Ok'})
})

export default projectController; 