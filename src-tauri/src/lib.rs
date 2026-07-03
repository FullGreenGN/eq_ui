pub mod commands;
pub mod models;

use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::mpsc::channel;
use std::thread;
use tauri::{Emitter, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // The Setup Hook: This runs when your app starts
        .setup(|app| {
            let app_handle = app.handle().clone();

            // Spawn a background thread so we don't freeze the UI
            thread::spawn(move || {
                let (tx, rx) = channel();
                let mut watcher = RecommendedWatcher::new(tx, Config::default()).unwrap();

                // Tell the watcher exactly which file to look at
                let config_path = "C:\\Program Files\\EqualizerAPO\\config\\config.txt";
                watcher.watch(Path::new(config_path), RecursiveMode::NonRecursive).unwrap();

                // Listen for events indefinitely
                for res in rx {
                    match res {
                        Ok(event) => {
                            // If the event is a modification, tell React!
                            if event.kind.is_modify() {
                                // We emit an event named "config-changed"
                                let _ = app_handle.emit("config-changed", ());
                            }
                        }
                        Err(e) => println!("Watch error: {:?}", e),
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::audio::read_config,
            commands::audio::write_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}