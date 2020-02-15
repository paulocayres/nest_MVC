import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema({
    categoria: String,
    descricao: String,
});
