import { invoke } from '@tauri-apps/api/core';
import { EqConfig } from '../types/audio';

// Default configuration optimized for immediate testing and headroom
export const DEFAULT_CONFIG: EqConfig = {
    preamp: -3.0, // Negative pre-amp headroom to prevent digital clipping on heavy bass
    bands: [
        { id: 1, frequency: 30, gain: 6.0, q: 1.0, type: 'LSC', enabled: true },   // Sub-Bass
        { id: 2, frequency: 80, gain: 12.0, q: 1.4, type: 'PK', enabled: true },    // Punch / Bass Kick
        { id: 3, frequency: 250, gain: 2.0, q: 1.0, type: 'PK', enabled: true },    // Low Mid
        { id: 4, frequency: 1000, gain: 0.0, q: 1.0, type: 'PK', enabled: true },   // Mid Range
        { id: 5, frequency: 4000, gain: 1.5, q: 1.0, type: 'PK', enabled: true },   // Presence
        { id: 6, frequency: 8000, gain: 3.0, q: 1.0, type: 'HSC', enabled: true },  // High Brilliance
    ]
};

export const tauriBridge = {
    /**
     * Calls the Rust `read_config` command.
     * If the file is missing, empty, or unparseable, it falls back to DEFAULT_CONFIG.
     */
    async readConfig(fallbackPath: string): Promise<EqConfig> {
        try {
            const rawText = await invoke<string>('read_config', { path: fallbackPath });
            return rawText ? JSON.parse(rawText) : DEFAULT_CONFIG;
        } catch (error) {
            console.warn("Could not read native config, using defaults:", error);
            return DEFAULT_CONFIG;
        }
    },

    /**
     * Calls the Rust `write_config` command, passing the serialized JSON state.
     */
    async writeConfig(fallbackPath: string, config: EqConfig): Promise<void> {
        return invoke<void>('write_config', {
            path: fallbackPath,
            content: JSON.stringify(config)
        });
    }
};