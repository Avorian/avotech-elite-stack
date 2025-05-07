// utils/themeClassMap.js
// 🔧 Utility to DRY up all theme-based class logic.
// 🎯 Use across components to keep styling centralized and scalable.

export const getThemeClasses = (theme, section = '') => {
    // 🔹 Base classes for each theme — shared across most components
    const base = {
      text: {
        matrix: 'text-green-400',
        cyberpunk: 'text-pink-300',
        nes: 'text-white',
      },
      bg: {
        matrix: 'bg-black/80 border-green-500 backdrop-blur-md shadow-[0_0_10px_#00ff00]',
        cyberpunk: 'bg-[#1a002d]/80 border-pink-500 backdrop-blur-md',
        nes: 'bg-black border-gray-400',
      },
      titleFont: {
        matrix: 'font-[Orbitron]',
        cyberpunk: 'neon-glow', // ⚠️ Placeholder for now — can split glow later
        nes: 'font-["Press_Start_2P"]',
      },
      glitch: {
        matrix: 'glitch-text',
        cyberpunk: 'glitch-text', // 🌀 Will split later into glow vs glitch
        nes: 'nes-different-animate',
      },
      button: {
        matrix: 'bg-green-700 text-black hover:bg-green-600',
        cyberpunk: 'bg-pink-600 text-white hover:bg-pink-700',
        nes: 'bg-red-600 text-white hover:bg-red-700 font-["Press_Start_2P"] text-xs',
      },
    };
  
    // 🧩 Section-specific overrides (e.g. Hero has different text color)
    const sectionOverrides = {
      hero: {
        text: {
          matrix: 'text-green-300',
          cyberpunk: 'text-pink-300',
          nes: 'text-white',
        },
      },
    };
  
    // 🧠 Compute final values
    const finalText =
      section && sectionOverrides[section]?.text
        ? sectionOverrides[section].text[theme] || base.text[theme]
        : base.text[theme];
  
    // 🔁 Return all mapped classes
    return {
      text: finalText,
      bg: base.bg[theme],
      font: base.titleFont[theme],
      glitch: base.glitch[theme],
      button: base.button[theme],
    };
  };
  