import * as mongoose from 'mongoose';

export const SunInputSchema = new mongoose.Schema({
    data: String,
    latitude: String,
    longitude: String,
    azimute: String,
    elevacao: String,
    sombra: {
        comprimento: String,
        direcao: String,
        altura: String,
    },
});
