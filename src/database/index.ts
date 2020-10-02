import mongoose from 'mongoose';

// conectando o mongouse com o localhost / com seu respectivo nome
mongoose.connect('mongodb://localhost/noderest', {
    useNewUrlParser : true , 
    useUnifiedTopology : true , 
    useFindAndModify : false , 
    useCreateIndex : true });

mongoose.Promise = global.Promise; // dentro do mongo é global

export default mongoose;    