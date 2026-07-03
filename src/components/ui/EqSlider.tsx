import React from 'react';
import { EqBand } from '../../types/audio';

interface EqSliderProps {
    band: EqBand;
    onChange: (id: number, gain: number) => void;
    onToggle: (id: number, enabled: boolean) => void;
}

export const EqSlider: React.FC<EqSliderProps> = React.memo(({ band, onChange, onToggle }) => {
    return (
        <div className={`flex flex-col items-center p-4 bg-zinc-900 rounded-lg border border-zinc-800 w-24 transition-opacity ${band.enabled ? 'opacity-100' : 'opacity-40'}`}>
            <span className="text-xs text-zinc-400 font-mono mb-1">{band.frequency}Hz</span>

            <div className="h-48 flex items-center justify-center my-4">
                <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={band.gain}
                    disabled={!band.enabled}
                    onChange={(e) => onChange(band.id, parseFloat(e.target.value))}
                    className="h-40 w-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    style={{ WebkitAppearance: 'slider-vertical' }}
                />
            </div>

            <span className="text-sm font-semibold text-zinc-200 font-mono mb-3">
        {band.gain > 0 ? `+${band.gain}` : band.gain}dB
      </span>

            <button
                onClick={() => onToggle(band.id, !band.enabled)}
                className={`px-2 py-1 text-[10px] uppercase rounded font-bold tracking-wider transition ${
                    band.enabled ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500'
                }`}
            >
                {band.enabled ? 'ON' : 'BYPASS'}
            </button>
        </div>
    );
});

EqSlider.displayName = 'EqSlider';