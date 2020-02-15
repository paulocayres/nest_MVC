import { Module } from '@nestjs/common';
import { SunService } from './sun.service';
import { SunController } from './sun.controller';
import { SunInputSchema } from './suninput.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [SunService],
  controllers: [SunController],
  imports: [MongooseModule.forFeature([{ name: 'SunInput', schema: SunInputSchema }])],
  exports: [SunService],
})
export class SunModule {}
