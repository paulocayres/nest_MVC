export class SunInputDto {
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
