import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.json';

const FunctionForStayLoged = (request:Request, response:Response, next: NextFunction) => { 

    const authHeader = request.headers.authorization;

    // senao foi informado o token
    if(!authHeader){
        return response.status(401).json({error: 'No token provided'});
    }

    // pega o token e divide-o o formato barer e os caraceteres 
    const parts = authHeader.split(' ');

    if(!(parts.length === 2)){
        return response.status(401).json({error: 'Token Error'});
    }

    // desestruturando barer e o token
    const [ scheme, token ] = parts;

    // verifico se é escrito bearer caso incecitivo pelo i
    if(!/^Bearer$/i.test(scheme)){
        return response.status(401).json({error: 'Token mal formatted'});
    }

    // verifica o token passado com sua chave secrete e tem um retorno que pode ser um erro ou o id do usuario
    verify(token, authConfig.secret, (err, decoded) => {
        if(err) return response.status(401).json({ error: 'Token Invalid'});

        //request.userId = decoded.id;
        return next();
    })

}

export default FunctionForStayLoged;