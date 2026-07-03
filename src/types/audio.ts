export interface EqBand {
    id: number;
    frequency: number; // in Hz
    gain: number;      // in dB (-12 to +12)
    q: number;         // Quality factor
    type: 'PK' | 'HSC' | 'LSC'; // Peak, High Shelf, Low Shelf
    enabled: boolean;
}

export interface EqConfig {
    preamp: number;    // in dB
    bands: EqBand[];
}

export interface AudioProfile {
    id: string;
    name: string;
    config: EqConfig;
}