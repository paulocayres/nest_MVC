import { Document } from 'mongoose';

export interface SunInput extends Document {
    readonly dataini: string;
    readonly datafim: string;
    readonly time: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly azimute: string;
    readonly elevacao: string;
    readonly sComprimento: string;
    readonly sDirecao: string;
    readonly sAltura: string;
}
