import { useAudioState } from './hooks/useAudioState';
import { EqSlider } from './components/ui/EqSlider';

export default function App() {
    const { config, isLoading, isSaving, updateBand, updatePreamp, saveConfig } = useAudioState();

    if (isLoading || !config) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-zinc-200">
                <p className="text-sm tracking-widest uppercase animate-pulse">Initializing System Framework...</p>
            </div>
        );
    }

    console.log(config)

    return (
        <div className="h-screen w-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/30">
            {/* Top Header Controls */}
            <header className="px-6 py-4 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white font-mono">EQ UI</h1>
                    <p className="text-xs text-zinc-500">System-wide Hardware Parameter Controller</p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Pre-Amp Control */}
                    <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                        <span className="text-xs text-zinc-400 font-mono uppercase">Pre-Amp</span>
                        <input
                            type="range"
                            min="-30"
                            max="30"
                            step="0.5"
                            value={config.preamp}
                            onChange={(e) => updatePreamp(parseFloat(e.target.value))}
                            className="w-32 accent-emerald-500"
                        />
                        <span className="text-sm font-mono font-bold text-emerald-400 w-12 text-right">{config.preamp}dB</span>
                    </div>

                    <button
                        onClick={saveConfig}
                        disabled={isSaving}
                        className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold px-5 py-2 rounded-lg text-sm tracking-wide transition uppercase"
                    >
                        {isSaving ? 'Applying...' : 'Apply Changes'}
                    </button>
                </div>
            </header>

            {/* Main Sliders Viewport */}
            <main className="flex-1 p-8 flex items-center justify-center gap-4 overflow-x-auto">
                {config.bands.map((band) => (
                    <EqSlider
                        key={band.id}
                        band={band}
                        onChange={(id, gain) => updateBand(id, { gain })}
                        onToggle={(id, enabled) => updateBand(id, { enabled })}
                    />
                ))}
            </main>
        </div>
    );
}