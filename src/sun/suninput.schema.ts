import * as mongoose from 'mongoose';

export const SunInputSchema = new mongoose.Schema({
    dataini: String,
    datafim: String,
    time: String,
    latitude: String,
    longitude: String,
    azimute: String,
    elevacao: String,
    sComprimento: String,
    sDirecao: String,
    sAltura: String,
    limElev: String,
    passo: String,
    horaini: String,
    horafim: String,

});
