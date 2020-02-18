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
        const horaini = new Date(sunInput.horaini).toString();
        const horafim = new Date(sunInput.horafim).toString();
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

        return null;
        // return { dataini, datafim, time,  latitude, longitude, azimute, elevacao, sComprimento, sDirecao, sAltura, limElev };
    }

    async getSunPositions(sunInput: SunInputDto): Promise<SunInput[]> {

        const dataini = new Date(sunInput.dataini).toString();
        const times = new Date(sunInput.dataini);
        const dtf = new Date(sunInput.datafim);
        const datafim = new Date(sunInput.datafim).toString();
        const horaini = sunInput.horaini;
        const horafim = sunInput.horafim;
        const lati: any = sunInput.latitude;
        const longi: any = sunInput.longitude;
        const latitude = sunInput.latitude;
        const longitude = sunInput.longitude;
        const sAltura = sunInput.sAltura;
        const limElev = sunInput.limElev;
        const passo = sunInput.passo;
        const positions: SunInput[] = [];
        let sun: any;
        let nAzimute: number;
        let dir: number;
        let azimute: string;
        let nElevacao: number;
        let elevacao: string;
        let elev: number;
        let comp: number;
        let sDirecao: string;
        let sComprimento: string;
        let time: string;

        this.sunModel.collection.drop();
        while (times < dtf) {
            sun = Sun.getPosition(times, lati, longi);
            nAzimute = ((sun.azimuth * 180 / Math.PI)) + 180;
            dir =  nAzimute + 180;
            if (dir > 360) {
                dir = dir - 360;
            }
            dir = (Math.round(dir * 100) / 100);
            azimute =  (Math.round(nAzimute * 100) / 100).toString();
            nElevacao = (sun.altitude * 180 / Math.PI);
            elevacao = (Math.round(nElevacao * 100) / 100).toString();
            elev = (sun.altitude * 180 / Math.PI);
            if (times.getHours() >= parseFloat(horaini) && times.getHours() <= parseFloat(horafim) && elev > parseFloat(limElev)) {
                comp = parseFloat(sAltura) / Math.tan(parseFloat(sun.altitude));
                sDirecao = dir.toString();
                sComprimento = (Math.round(comp * 100) / 100).toString();
                time = times.toString();
                // positions.push({ dataini, datafim, time, latitude, longitude, azimute, elevacao,_
                // sComprimento, sDirecao, sAltura, limElev, passo });
                sunInput = {
                    dataini, datafim, time,
                    latitude, longitude,
                    azimute, elevacao,
                    sComprimento, sDirecao, sAltura,
                    limElev, passo, horaini, horafim,
                };
                positions.push(sunInput);
                // createdSun.save(sunInput);
                // createdSun.save();
            }
            times.setMinutes(times.getMinutes() + parseFloat(passo));

        }
        this.sunModel.insertMany(positions);
        return positions;
    }

}
