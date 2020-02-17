import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaModule } from './categoria/categoria.module';
import { SunModule } from './sun/sun.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://paulo.cayres:pccr0976@ds263078.mlab.com:63078/imperium'), CategoriaModule, SunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
