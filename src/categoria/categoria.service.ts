import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaDto } from './categoria.dto';
import { Categoria } from './categoria.interface';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    ) {}

    async getCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().exec();
    }

    async setCategoria(categoria: CategoriaDto): Promise<Categoria>  {
        const createdCategoria = this.categoriaModel(categoria);
        return await createdCategoria.save();
    }
}
