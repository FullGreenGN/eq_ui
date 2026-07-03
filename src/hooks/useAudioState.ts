import { useState, useEffect, useCallback, useRef } from 'react';
import { listen } from '@tauri-apps/api/event';
import { EqConfig, EqBand } from '../types/audio';
import { useApoConfig } from './useApoConfig';

export function useAudioState() {
    const { loadConfig, saveConfigNative, isLoading, isSaving } = useApoConfig();
    const [config, setConfig] = useState<EqConfig | null>(null);

    // Ref to prevent UI from overwriting state during a save operation
    const isCurrentlySaving = useRef(false);

    useEffect(() => {
        loadConfig().then((fetchedConfig) => {
            if (fetchedConfig) setConfig(fetchedConfig);
        });
    }, [loadConfig]);

    useEffect(() => {
        const unlisten = listen('config-changed', () => {
            if (isCurrentlySaving.current) return; // Ignore events triggered by our own saves

            loadConfig().then((fetchedConfig) => {
                if (fetchedConfig) setConfig(fetchedConfig);
            });
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, [loadConfig]);

    const updateBand = useCallback((bandId: number, fields: Partial<Omit<EqBand, 'id'>>) => {
        setConfig((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                bands: prev.bands.map((b) => (b.id === bandId ? { ...b, ...fields } : b)),
            };
        });
    }, []);

    const updatePreamp = useCallback((val: number) => {
        setConfig((prev) => (prev ? { ...prev, preamp: val } : null));
    }, []);

    const saveConfig = useCallback(async () => {
        if (config) {
            isCurrentlySaving.current = true;
            await saveConfigNative(config);
            // Brief timeout to let the OS file-watcher settle before reacting to external changes again
            setTimeout(() => {
                isCurrentlySaving.current = false;
            }, 500);
        }
    }, [config, saveConfigNative]);

    return {
        config,
        isLoading,
        isSaving,
        updateBand,
        updatePreamp,
        saveConfig
    };
}