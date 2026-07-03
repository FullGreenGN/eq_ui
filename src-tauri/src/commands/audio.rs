use std::fs;
use regex::Regex;
use crate::models::{EqBand, EqConfig};

#[tauri::command]
pub fn read_config(path: String) -> Result<String, String> {
    let content = fs::read_to_string(&path).unwrap_or_else(|_| "".to_string());

    let mut config = EqConfig {
        preamp: 0.0,
        bands: Vec::new(),
    };

    // Regex for Preamp (e.g., "Preamp: -3.5 dB")
    let preamp_re = Regex::new(r"Preamp:\s*([+-]?\d*\.?\d+)\s*dB").unwrap();
    if let Some(caps) = preamp_re.captures(&content) {
        if let Ok(val) = caps[1].parse::<f32>() {
            config.preamp = val;
        }
    }

    // Regex for Filters (e.g., "Filter 1: ON PK Fc 80 Hz Gain 12 Q 1.4")
    let filter_re = Regex::new(r"Filter\s+(\d+):\s+(ON|OFF)\s+(\w+)\s+Fc\s+([+-]?\d*\.?\d+)\s+Hz\s+Gain\s+([+-]?\d*\.?\d+)\s*(?:dB)?\s+Q\s+([+-]?\d*\.?\d+)").unwrap();

    for caps in filter_re.captures_iter(&content) {
        let id = caps[1].parse::<u32>().unwrap_or(0);
        let enabled = &caps[2] == "ON";
        let band_type = caps[3].to_string();
        let frequency = caps[4].parse::<f32>().unwrap_or(0.0);
        let gain = caps[5].parse::<f32>().unwrap_or(0.0);
        let q = caps[6].parse::<f32>().unwrap_or(1.0);

        config.bands.push(EqBand {
            id,
            frequency,
            gain,
            q,
            r#type: band_type,
            enabled,
        });
    }

    serde_json::to_string(&config).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn write_config(path: String, content: String) -> Result<(), String> {
    let config: EqConfig = serde_json::from_str(&content).map_err(|e| e.to_string())?;

    let mut output = String::new();

    // Write Preamp
    output.push_str(&format!("Preamp: {:.1} dB\n", config.preamp));

    // Write Filters
    for band in config.bands {
        let status = if band.enabled { "ON" } else { "OFF" };
        output.push_str(&format!(
            "Filter {}: {} {} Fc {:.1} Hz Gain {:.1} dB Q {:.2}\n",
            band.id, status, band.r#type, band.frequency, band.gain, band.q
        ));
    }

    fs::write(path, output).map_err(|e| e.to_string())
}