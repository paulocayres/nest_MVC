import { Injectable, HttpService, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DummyDto } from './dummy.dto';
import { Dummy } from './dummy.interface';

@Injectable()
export class DummyService {

    constructor(
        @InjectModel('Dummy') private readonly dummyModel: Model<Dummy>,
    ) {}

    async getDummy(): Promise<Dummy[]> {
        return await this.dummyModel.find().exec();
    }

    async setDummy(dummy: DummyDto): Promise<Dummy>  {
        const createdDummy = this.dummyModel(dummy);
        return await createdDummy.save();
    }
}
