import { Document } from 'mongoose';

export interface SunInput extends Document {
    readonly data: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly azimute: string;
    readonly elevacao: string;
    readonly sombra: {
        comprimento: string,
        direcao: string,
        altura: string,
    };
}
