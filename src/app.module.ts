import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaModule } from './categoria/categoria.module';
import { SunModule } from './sun/sun.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://paulo.cayres:pccr0976@ds255917.mlab.com:55917/nest_mvc'), CategoriaModule, SunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
