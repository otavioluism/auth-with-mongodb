import mongoose from '../database';
 
// criamos o schema para colocar os campos de dados dentro do nosso banco de dados 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: { 
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String, 
        required: true,
        select: false, // para quando buscarmos no BD, nao retorna 
    }, 
    createdAt: { 
        type: Date,
        default: Date.now,
    },
});

// definindo o banco de dados User que é do tipo UserSchema
const db = mongoose.model('db', UserSchema);

export default db;