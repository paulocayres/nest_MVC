import { Controller, Get, Render, Post, Logger, Body } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from './categoria.dto';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Get()
    @Render('categoria')
    async getDummy(): Promise<object> {
        Logger.log('GetLog ' + JSON.stringify(await this.categoriaService.getCategorias()));
        return {categoriaArray: await this.categoriaService.getCategorias()};
    }

    @Post()
    @Render('categoria')
    async setDummy(@Body() categoria: CategoriaDto): Promise<object> {
        Logger.log('PostLog ' + JSON.stringify(categoria));
        await this.categoriaService.setCategoria(categoria);
        return {categoriaArray: await this.categoriaService.getCategorias()};
    }
}
