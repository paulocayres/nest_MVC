import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SunInput } from './suninput.interface';
import { SunInputDto } from './sunInput.dto';
import { Model } from 'mongoose';
import * as Sun from 'suncalc';

@Injectable()
export class SunService {
    constructor(
        @InjectModel('SunInput') private readonly sunModel: Model<SunInput>,
    ) {}

    async getSunPosition(): Promise < SunInput > {

        const times: Date = new Date();
        const sun = Sun.getPosition(times, -47, -15);
        const azimute = (sun.azimuth * 180 / Math.PI).toString();
        const elevacao  = (sun.altitude * 180 / Math.PI).toString();
        const latitude = (51.5).toString();
        const longitude = (-0.1).toString();
        const data = times.getDay().toString() + '/' + times.getMonth().toString() + '/' + times.getFullYear().toString() + ' '
        + times.getHours().toString() + ':' + times.getMinutes().toString();
        Logger.log('Data: ' + data);
        let direc = 180 + parseFloat(azimute);
        if (direc >= 360) {
            direc = direc - 360;
        }
        const sombra = {
            direcao: direc.toString(),
            comprimento:  elevacao,
            altura: '5',
        };
 
        return {data, latitude, longitude, azimute, elevacao, sombra};

    }

    async postSunPosition(sunInput: SunInputDto): Promise < SunInput > {

        const times: Date = new Date(sunInput.data);
        const lati: any = sunInput.latitude;
        const longi: any = sunInput.longitude;
        const latitude = sunInput.latitude;
        const longitude = sunInput.longitude;
        const sun = Sun.getPosition(times, lati, longi);
        const azimute = ((sun.azimuth * 180 / Math.PI) + 180).toString();
        const elevacao  = (sun.altitude * 180 / Math.PI).toString();
        const data = times.getDay().toString() + '/' + times.getMonth().toString() + '/' + times.getFullYear().toString() + ' '
        + times.getHours().toString() + ':' + times.getMinutes().toString();
        Logger.log('Data: ' + data);
        let direc = 180 + parseFloat(azimute);
        if (direc >= 360) {
            direc = direc - 360;
        }
        const sombra = {
            direcao: direc.toString(),
            comprimento:  elevacao,
            altura: sunInput.sombra.altura,
        };
        return {data, latitude, longitude, azimute, elevacao, sombra};
    }
}
