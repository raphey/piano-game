// Instrument Configuration
// Centralized configuration for all instrument-specific settings
// This makes it easy to create versions for different instruments (violin, piano, etc.)

const InstrumentConfig = {
    // Basic instrument info
    name: 'Piano',
    key: 'C', // C major

    // Default settings
    defaultTolerance: 4,

    // Audio sample configuration
    sampleDirectory: 'samples/',
    sampleNotes: {
        'A3': 57,   // 220 Hz
        'C4': 60,   // 261.63 Hz (middle C)
        'Eb4': 63,  // 311.13 Hz
        'Gb4': 66,  // 369.99 Hz
        'A4': 69,   // 440 Hz
        'C5': 72    // 523.25 Hz
    },

    // Game patterns (notes and durations for each category/level)
    patterns: {
        "open-strings": {
            "level1": [
                { "notes": ["C4"], "durations": [4] },
                { "notes": ["F4"], "durations": [4] },
                { "notes": ["G4"], "durations": [4] },
                { "notes": ["F4"], "durations": [4] },
                { "notes": ["G4"], "durations": [4] }
            ],
            "level2": [],
            "level3": [],
            "level4": []
        },
        "see-saw": {
            "level1": [
                { "notes": ["C4", "C4"], "durations": [2, 2] },
                { "notes": ["F4", "F4"], "durations": [2, 2] },
                { "notes": ["G4", "G4"], "durations": [2, 2] }
            ],
            "level2": [
                { "notes": ["C4", "C4"], "durations": [2, 2] },
                { "notes": ["C4", "F4"], "durations": [2, 2] },
                { "notes": ["C4", "G4"], "durations": [2, 2] },
                { "notes": ["F4", "F4"], "durations": [2, 2] },
                { "notes": ["F4", "C4"], "durations": [2, 2] },
                { "notes": ["F4", "G4"], "durations": [2, 2] },
                { "notes": ["G4", "G4"], "durations": [2, 2] },
                { "notes": ["G4", "C4"], "durations": [2, 2] },
                { "notes": ["G4", "F4"], "durations": [2, 2] }
            ],
            "level3": [
                { "notes": ["C4", "C4", "C4"], "durations": [1, 1, 2] },
                { "notes": ["C4", "F4", "G4"], "durations": [1, 1, 2] },
                { "notes": ["F4", "F4", "C4"], "durations": [1, 1, 2] },
                { "notes": ["G4", "G4", "F4"], "durations": [1, 1, 2] },
                { "notes": ["C4", "C4", "F4"], "durations": [1, 2, 1] },
                { "notes": ["F4", "F4", "G4"], "durations": [1, 2, 1] },
                { "notes": ["G4", "C4", "C4"], "durations": [1, 2, 1] },
                { "notes": ["C4", "G4", "C4"], "durations": [1, 2, 1] },
                { "notes": ["C4", "F4", "C4"], "durations": [2, 1, 1] },
                { "notes": ["F4", "C4", "G4"], "durations": [2, 1, 1] },
                { "notes": ["G4", "G4", "C4"], "durations": [2, 1, 1] },
                { "notes": ["C4", "C4", "G4"], "durations": [2, 1, 1] }
            ],
            "level4": [
                { "notes": ["C4", "C4", "F4", "G4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "F4", "C4", "G4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "F4", "F4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G4", "F4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F4", "F4", "C4", "G4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F4", "G4", "C4", "F4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F4", "G4", "G4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G4", "C4", "F4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G4", "G4", "C4", "F4"], "durations": [1, 1, 1, 1] }
            ]
        },
        "twinkle": {
            "level1": [
                { "notes": ["C4", "D4"], "durations": [2, 2] },
                { "notes": ["C4", "G5"], "durations": [2, 2] },
                { "notes": ["C4", "F5"], "durations": [2, 2] },
                { "notes": ["C4", "G5"], "durations": [2, 2] },
                { "notes": ["C4", "A5"], "durations": [2, 2] }
            ],
            "level2": [
                { "notes": ["C4", "C4"], "durations": [2, 2] },
                { "notes": ["D4", "D4"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] },
                { "notes": ["F5", "F5"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] },
                { "notes": ["A5", "A5"], "durations": [2, 2] }
            ],
            "level3": [
                { "notes": ["C4", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "A5"], "durations": [2, 2] },
                { "notes": ["A5", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "F5"], "durations": [2, 2] },
                { "notes": ["F5", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "D4"], "durations": [2, 2] },
                { "notes": ["D4", "C4"], "durations": [2, 2] }
            ],
            "level4": [
                { "notes": ["C4", "C4", "G5"], "durations": [1, 1, 2] },
                { "notes": ["C4", "C4", "G5"], "durations": [1, 2, 1] },
                { "notes": ["C4", "C4", "G5"], "durations": [2, 1, 1] },
                { "notes": ["G5", "A5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "A5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "A5", "G5"], "durations": [2, 1, 1] },
                { "notes": ["F5", "G5", "D4"], "durations": [1, 1, 2] },
                { "notes": ["F5", "G5", "D4"], "durations": [1, 2, 1] },
                { "notes": ["F5", "G5", "D4"], "durations": [2, 1, 1] },
                { "notes": ["A5", "G5", "F5"], "durations": [1, 1, 2] },
                { "notes": ["A5", "G5", "F5"], "durations": [1, 2, 1] },
                { "notes": ["A5", "G5", "F5"], "durations": [2, 1, 1] },
                { "notes": ["G5", "D4", "C4"], "durations": [1, 1, 2] },
                { "notes": ["G5", "D4", "C4"], "durations": [1, 2, 1] },
                { "notes": ["G5", "D4", "C4"], "durations": [2, 1, 1] },
                { "notes": ["G5", "F5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "F5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "F5", "G5"], "durations": [2, 1, 1] }
            ],
            "level5": [
                { "notes": ["C4", "C4", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "A5", "A5"], "durations": [1, 1, 1, 1] },
                { "notes": ["A5", "A5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "F5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "D4", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "D4", "C4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "A5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "A5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "D4", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "D4"], "durations": [1, 1, 1, 1] }
            ]
        },
        "lightly-row": {
            "level1": [
                { "notes": ["G5", "C4"], "durations": [2, 2] },
                { "notes": ["G5", "D4"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "F5"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] }
            ],
            "level2": [
                { "notes": ["C4", "G5"], "durations": [2, 2] },
                { "notes": ["D4", "F5"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "C4"], "durations": [2, 2] },
                { "notes": ["F5", "D4"], "durations": [2, 2] },
                { "notes": ["G5", "G5"], "durations": [2, 2] },
                { "notes": ["D4", "G5"], "durations": [2, 2] },
                { "notes": ["G5", "F5"], "durations": [2, 2] },
                { "notes": ["F5", "G5"], "durations": [2, 2] }
            ],
            "level3": [
                { "notes": ["C4", "G5", "C4"], "durations": [1, 1, 2] },
                { "notes": ["C4", "G5", "C4"], "durations": [1, 2, 1] },
                { "notes": ["C4", "G5", "C4"], "durations": [2, 1, 1] },
                { "notes": ["G5", "C4", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "C4", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "C4", "G5"], "durations": [2, 1, 1] },
                { "notes": ["D4", "F5", "D4"], "durations": [1, 1, 2] },
                { "notes": ["D4", "F5", "D4"], "durations": [1, 2, 1] },
                { "notes": ["D4", "F5", "D4"], "durations": [2, 1, 1] },
                { "notes": ["F5", "D4", "F5"], "durations": [1, 1, 2] },
                { "notes": ["F5", "D4", "F5"], "durations": [1, 2, 1] },
                { "notes": ["F5", "D4", "F5"], "durations": [2, 1, 1] },
                { "notes": ["G5", "G5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "G5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "G5", "G5"], "durations": [2, 1, 1] },
                { "notes": ["G5", "G5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "G5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "G5", "G5"], "durations": [2, 1, 1] },
                { "notes": ["D4", "G5", "F5"], "durations": [1, 1, 2] },
                { "notes": ["D4", "G5", "F5"], "durations": [1, 2, 1] },
                { "notes": ["D4", "G5", "F5"], "durations": [2, 1, 1] },
                { "notes": ["G5", "F5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["G5", "F5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["G5", "F5", "G5"], "durations": [2, 1, 1] },
                { "notes": ["C4", "G5", "G5"], "durations": [1, 1, 2] },
                { "notes": ["C4", "G5", "G5"], "durations": [1, 2, 1] },
                { "notes": ["C4", "G5", "G5"], "durations": [2, 1, 1] }
            ],
            "level4": [
                { "notes": ["C4", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["C4", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "C4", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "C4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "C4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "G5", "D4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "G5", "D4", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "G5", "F5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "F5", "D4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "F5", "D4", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "F5", "G5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["D4", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "D4", "G5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "D4", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "D4", "F5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "D4", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "D4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "D4", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "D4", "G5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "D4", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "D4", "F5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "D4", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "D4", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "D4", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "D4"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["F5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "F5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "G5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "G5"], "durations": [1, 1, 1, 1] },
                { "notes": ["G5", "F5", "G5", "F5"], "durations": [1, 1, 1, 1] }
            ]
        },
        "wind": {
            "level1": [],
            "level2": [],
            "level3": [],
            "level4": []
        }
    },

    // Victory sound patterns (frequencies in Hz) for each category
    victoryPatterns: {
        'open-strings': {
            notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
            description: 'Ascending C major scale from C4'
        },
        'see-saw': {
            notes: [293.66, 293.66, 293.66, 293.66, 293.66, 293.66, 261.63, 329.63, 392.00, 523.25],
            description: 'Triplet eighth notes: D D D D D D C E G C',
            triplet: true
        },
        'twinkle': {
            notes: [349.23, 349.23, 329.63, 329.63, 293.66, 392.00, 523.25],
            description: 'Eighth notes: F F E E D G C'
        },
        'lightly-row': {
            notes: [261.63, 329.63, 392.00, 392.00, 329.63, 392.00, 523.25],
            description: 'Scale degrees 1 3 5 5 3 5 8 in C major'
        },
        'default': {
            notes: [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 987.77,
                    1046.50, 1318.51, 1567.98, 1975.53, 1046.50, 1318.51, 1567.98, 1975.53],
            description: 'C major 7th arpeggio with repeat'
        }
    }
};
