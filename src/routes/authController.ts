import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth.json';

import db from '../models/User';

const authController = Router();


authController.post('/register', async (request, response) => { 

    try{ 
        const { name, email, password } = request.body;
        
        const findEmailInSameDate = await db.findOne({email: email});

        if(findEmailInSameDate){ 
            return response.status(200).send('Email already is created');
        }

        const hashPassword = await hash(password, 8);

        const user = await db.create({
            name,
            email,
            password: hashPassword,
        });

        // destrutura o objeto 
        const {password:senha, ...payload} = user.toObject();

        return response.status(200).send(payload)
    }catch (err) { 
        return response.status(200).json({message: 'Registraded Failed'})
    }
   
});

authController.post('/authenticate', async (request, response) => { 
    const { email, password } = request.body;

    // buscando pelo usuario com aquele email, retornando o usuario e a senha
    const user = await db.findOne({email: email}).select('+password');

    if(!user){
        return response.status(400).send({error: 'User not found'});
    }

    // destrutura o objeto vindo do banco de dos
    const {password:senha, ...rest} = user.toObject();

    // compara a senha vinda com a senha do banco de dados
    const ComparePassword = await compare(password, senha);

    // se a senha estiver incorreta 
    if(!ComparePassword){
        return response.status(400).json({error: 'Login/Password incorrect' })
    }

     // gerando token para o usuario
     const token = sign({id: rest._id}, authConfig.secret, {
        expiresIn: 86400, // expira esse token em 1 dia
    });
   
    console.log(token);

    return response.status(200).send({rest, token});
    //return response.status(200).json({payload, token});
});

export default authController;