import { Controller, Get, Render, Post, Body, Logger } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyDto } from './dummy.dto';
import { Dummy } from './dummy.interface';

@Controller('dummy')
export class DummyController {

    private dummyArray: any;
    private stringify: string;

    constructor(private dummyService: DummyService) {}
    @Get()
    @Render('dummy')
    async getDummy(): Promise<object> {
        Logger.log('GetLog ' + JSON.stringify(await this.dummyService.getDummy()));
        return {dummyArray: await this.dummyService.getDummy()};
        // return await this.dummyService.getDummy();
    }

    @Post()
    @Render('dummy')
    async setDummy(@Body() dummy: DummyDto): Promise<object> {
        Logger.log('PostLog ' + JSON.stringify(dummy));
        await this.dummyService.setDummy(dummy);
        return {dummyArray: await this.dummyService.getDummy()};
    }
}
