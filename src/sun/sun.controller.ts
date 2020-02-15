import { Controller, Get, Render, Post, Logger, Body } from '@nestjs/common';
import { SunInputDto } from './sunInput.dto';
import { SunService } from './sun.service';

@Controller('sun')
export class SunController {

    constructor(private sunService: SunService) { }

/*     @Get()
    @Render('sun')
    async getDummy(): Promise<object> {
        //Logger.log('GetLog ' + JSON.stringify(await this.sunService.getSunPosition()));
        //return { sunArray: await this.sunService.getSunPosition() };
    } */

    @Get()
    @Render('sun')
    async getSun(): Promise<object> {
        const sun = await this.sunService.getSunPosition();
        return sun;
    }


    @Post()
    @Render('sun')
    async postSun(@Body() sunInput: SunInputDto): Promise<object> {
        return await this.sunService.postSunPosition(sunInput);
    }


}
