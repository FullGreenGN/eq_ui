import { useState, useCallback } from 'react';
import { EqConfig } from '../types/audio';
import { tauriBridge } from '../lib/tauriBridge';

// You will eventually want to make this dynamic, but hardcode it for the test flight
const CONFIG_PATH = 'C:\\Program Files\\EqualizerAPO\\config\\config.txt';

export function useApoConfig() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const loadConfig = useCallback(async (): Promise<EqConfig | null> => {
        setIsLoading(true);
        try {
            return await tauriBridge.readConfig(CONFIG_PATH);
        } catch (error) {
            console.error("Failed to load native config:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveConfigNative = useCallback(async (config: EqConfig) => {
        setIsSaving(true);
        try {
            await tauriBridge.writeConfig(CONFIG_PATH, config);
        } catch (error) {
            console.error("Failed to save native config:", error);
        } finally {
            setIsSaving(false);
        }
    }, []);

    return { loadConfig, saveConfigNative, isLoading, isSaving };
}