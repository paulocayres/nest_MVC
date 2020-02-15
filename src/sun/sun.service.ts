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
    ) { }

    async getSunPosition(sunInput: SunInputDto): Promise<SunInput> {

        const dataini = new Date(sunInput.dataini).toString();
        const datafim = new Date(sunInput.datafim).toString();
        const times = new Date(sunInput.dataini).toString();
        const time = times;
        const lati: any = sunInput.latitude;
        const longi: any = sunInput.longitude;
        const latitude = sunInput.latitude;
        const longitude = sunInput.longitude;
        const sun = Sun.getPosition(times, lati, longi);
        const azimute = ((sun.azimuth * 180 / Math.PI) + 180).toString();
        const elevacao = (sun.altitude * 180 / Math.PI).toString();
        const direc = azimute;
        const sAltura = sunInput.sAltura;
        const comp = parseFloat(sAltura) / Math.tan(parseFloat(sun.altitude));
        const sDirecao = direc.toString();
        const sComprimento = comp.toString();

        return { dataini, datafim, time,  latitude, longitude, azimute, elevacao, sComprimento, sDirecao, sAltura };
    }

    async getSunPositions(sunInput: SunInputDto): Promise<SunInput[]> {

        const dataini = new Date(sunInput.dataini).toString();
        const times = new Date(sunInput.dataini);
        const dtf = new Date(sunInput.datafim);
        const datafim = new Date(sunInput.datafim).toString();
        const lati: any = sunInput.latitude;
        const longi: any = sunInput.longitude;
        const latitude = sunInput.latitude;
        const longitude = sunInput.longitude;
        const sAltura = sunInput.sAltura;

        const positions: SunInput[] = [];


        while (times < dtf) {
            const sun = Sun.getPosition(times, lati, longi);
            const azimute = ((sun.azimuth * 180 / Math.PI) + 180).toString().replace('.', ',');
            const elevacao = (sun.altitude * 180 / Math.PI).toString().replace('.', ',');
            const elev = (sun.altitude * 180 / Math.PI);
            if (elev > 30) {
                const comp = parseFloat(sAltura) / Math.tan(parseFloat(sun.altitude));
                const sDirecao = azimute.replace('.', ',');
                const sComprimento = comp.toString().replace('.', ',');
                const time = times.toString();
                positions.push({ dataini, datafim, time, latitude, longitude, azimute, elevacao, sComprimento, sDirecao, sAltura });
            }
            times.setHours(times.getHours() + 1);

        }


        return positions;
    }

}
