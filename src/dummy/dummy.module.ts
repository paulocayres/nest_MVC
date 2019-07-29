import { Module, HttpModule } from '@nestjs/common';
import { DummyController } from './dummy.controller';
import { DummyService } from './dummy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DummySchema } from './dummy.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Dummy', schema: DummySchema }])],
  controllers: [DummyController],
  providers: [DummyService],
  exports: [DummyService],
})
export class DummyModule {}
