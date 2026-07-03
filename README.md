# EQ UI (Modern Peace)

**EQ UI** is a modern, high-performance, and lightweight GUI replacement for managing **Equalizer APO** configurations on Windows. Built for power users and audio enthusiasts who need a responsive, dark-themed dashboard to control system-wide audio processing.

## 🚀 Vision
The goal of EQ UI is to provide a clean, modern interface that sits atop the powerful Equalizer APO engine. It leverages **Tauri** for a native, low-resource footprint and **React** for a fluid, reactive user experience.

## 🛠 Tech Stack
*   **Frontend:** [React](https://react.dev/), TypeScript, Vite.
*   **Backend:** [Rust](https://www.rust-lang.org/) (via [Tauri](https://tauri.app/)).
*   **Build Tool:** [Bun](https://bun.sh/).
*   **Audio Engine:** [Equalizer APO](https://sourceforge.net/projects/equalizerapo/).

## 📋 Features
- [ ] **Real-time Config Sync:** Automatically detects and applies changes to the `config.txt` file.
- [ ] **System-wide Control:** Instant adjustments for volume, pre-amp gain, and filter settings.
- [ ] **Profile Management:** Switch between different audio setups for gaming, music (Hardcore/Gabber), and production.
- [ ] **Low Latency:** Optimized Rust backend ensuring zero-interference with audio playback.

## ⚙️ Prerequisites
Before building, ensure you have the following installed:
1.  **[Node.js / Bun](https://bun.sh/)**
2.  **[Rust](https://www.rust-lang.org/tools/install)**
3.  **[Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)** (Required for Tauri/Windows compilation).

## 📦 Setup & Development
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd eq_ui

```

2. **Install dependencies:**
```bash
bun install

```


3. **Start the development server:**
```bash
bun run tauri dev

```



## 🏗 Project Architecture

* `/src`: Frontend React components and state management.
* `/src-tauri`: Rust backend logic, file system I/O, and APO communication layer.
* `config.txt`: The targeted Equalizer APO configuration file monitored by the app.

## 🤝 Roadmap

* [ ] Initial bridge: React UI to Rust backend communication.
* [ ] File I/O: Implement parsing for Equalizer APO syntax.
* [ ] Dashboard: Create the primary EQ slider UI.
* [ ] Advanced: Add support for preset loading and auto-gain protection.

## 🛡 Disclaimer

This project is an unofficial interface for Equalizer APO. Use with caution; improper configuration of audio filters can lead to clipping or unintended audio behavior.

---

*Built by FullGreenGN | 2026*