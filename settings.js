// Settings Manager
// Manages global game settings with localStorage persistence
const Settings = {
    // Default values
    defaults: {
        tempo: 80,
        tolerance: InstrumentConfig.defaultTolerance,
        levelLength: 5,
        showNotes: false,
        readyBeforePlay: true
    },

    // Current values (loaded from localStorage or defaults)
    current: {},

    // Initialize settings from localStorage or defaults
    init: function() {
        const storedShowNotes = localStorage.getItem(
            'piano-game-showNotes'
        );
        const storedReady = localStorage.getItem(
            'piano-game-readyBeforePlay'
        );

        this.current = {
            tempo: parseInt(
                localStorage.getItem('piano-game-tempo')
            ) || this.defaults.tempo,
            tolerance: parseFloat(
                localStorage.getItem('piano-game-tolerance')
            ) || this.defaults.tolerance,
            levelLength: parseInt(
                localStorage.getItem('piano-game-levelLength')
            ) || this.defaults.levelLength,
            showNotes: storedShowNotes !== null
                ? storedShowNotes === 'true'
                : this.defaults.showNotes,
            readyBeforePlay: storedReady !== null
                ? storedReady === 'true'
                : this.defaults.readyBeforePlay
        };

        // Validate ranges
        this.current.tempo = Math.max(60, Math.min(120, this.current.tempo));
        this.current.tolerance = Math.max(2, Math.min(10, this.current.tolerance));
        this.current.levelLength = Math.max(5, Math.min(15, this.current.levelLength));

        // Apply to Audio and Game
        this.apply();

        console.log('Settings loaded:', this.current);
    },

    // Apply current settings to game systems
    apply: function() {
        if (typeof Audio !== 'undefined') {
            Audio.setTempo(this.current.tempo);
        }
        if (typeof Game !== 'undefined') {
            Game.tolerance = this.current.tolerance * 0.6;
            Game.totalQuestions = this.current.levelLength;
        }
    },

    // Update a setting and persist
    set: function(key, value) {
        this.current[key] = value;
        localStorage.setItem(`piano-game-${key}`, value);
        this.apply();
        console.log(`Setting updated: ${key} = ${value}`);
    },

    // Get a setting value
    get: function(key) {
        return this.current[key];
    },

    // Reset all settings to defaults
    reset: function() {
        this.current = { ...this.defaults };
        localStorage.removeItem('piano-game-tempo');
        localStorage.removeItem('piano-game-tolerance');
        localStorage.removeItem('piano-game-levelLength');
        localStorage.removeItem('piano-game-showNotes');
        localStorage.removeItem('piano-game-readyBeforePlay');
        this.apply();
        console.log('Settings reset to defaults');
    }
};

// Initialize settings when page loads
window.addEventListener('DOMContentLoaded', () => {
    Settings.init();
});
