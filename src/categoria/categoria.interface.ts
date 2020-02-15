import { Document } from 'mongoose';

export interface Categoria extends Document {
    readonly categoria: string;
    readonly descricao: string;
}
