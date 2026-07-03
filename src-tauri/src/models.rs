use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct EqConfig {
    pub preamp: f32,
    pub bands: Vec<EqBand>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EqBand {
    pub id: u32,
    pub frequency: f32,
    pub gain: f32,
    pub q: f32,
    pub r#type: String, // "type" is a reserved keyword in Rust, so we use r#type
    pub enabled: bool,
}