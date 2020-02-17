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
        const limElev = sunInput.limElev;

        return;
        // return { dataini, datafim, time,  latitude, longitude, azimute, elevacao, sComprimento, sDirecao, sAltura, limElev };
    }

    async getSunPositions(sunInput: SunInputDto): Promise<SunInput> {

        const dataini = new Date(sunInput.dataini).toString();
        const times = new Date(sunInput.dataini);
        const dtf = new Date(sunInput.datafim);
        const datafim = new Date(sunInput.datafim).toString();
        const lati: any = sunInput.latitude;
        const longi: any = sunInput.longitude;
        const latitude = sunInput.latitude;
        const longitude = sunInput.longitude;
        const sAltura = sunInput.sAltura;
        const limElev = sunInput.limElev;
        const passo = sunInput.passo;
        

        const positions: SunInput[] = [];


        while (times < dtf) {
            const sun = Sun.getPosition(times, lati, longi);
            const nAzimute = ((sun.azimuth * 180 / Math.PI)) + 180;
            let dir =  nAzimute + 180;
            if (dir > 360) {
                dir = dir - 360;
            }
            dir = (Math.round(dir * 100) / 100);
            const azimute =  (Math.round(nAzimute * 100) / 100).toString();
            const nElevacao = (sun.altitude * 180 / Math.PI);
            const elevacao = (Math.round(nElevacao * 100) / 100).toString();
            const elev = (sun.altitude * 180 / Math.PI);
            if (times.getHours() > 6 && times.getHours() < 20 && elev > parseFloat(limElev)) {
                const comp = parseFloat(sAltura) / Math.tan(parseFloat(sun.altitude));
                const sDirecao = dir.toString();
                const sComprimento = (Math.round(comp * 100) / 100).toString();
                const time = times.toString();
                // positions.push({ dataini, datafim, time, latitude, longitude, azimute, elevacao,_
                // sComprimento, sDirecao, sAltura, limElev, passo });
                sunInput = { dataini, datafim, time, latitude, longitude, azimute, elevacao, sComprimento, sDirecao, sAltura, limElev, passo };
                const createdSun = this.sunModel(sunInput);
                createdSun.save();
            }
            times.setMinutes(times.getMinutes() + parseFloat(passo));

        }

        return sunInput;
    }

}
