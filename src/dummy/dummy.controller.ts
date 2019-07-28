import { Controller, Get, Render, Post, Body, Logger } from '@nestjs/common';
import { DummyService } from './dummy.service';

@Controller('dummy')
export class DummyController {

    constructor(private dummyService: DummyService) {}
    @Get()
    @Render('dummy')
    getDummy() {
        Logger.log('GetLog ' + JSON.stringify(this.dummyService.getDummy()));
        return this.dummyService.getDummy();
    }

    @Post()
    @Render('dummy')
    setDummy(@Body() dummy: JSON) {
        Logger.log('PostLog ' + JSON.stringify(dummy));
        this.dummyService.setDummy(dummy);
        return this.dummyService.getDummy();
    }
}
