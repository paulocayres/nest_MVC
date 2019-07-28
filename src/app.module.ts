import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DummyModule } from './dummy/dummy.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://paulo.cayres:pccr0976@ds255917.mlab.com:55917/nest_mvc'), DummyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
