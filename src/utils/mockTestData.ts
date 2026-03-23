/**
 * ACRE Test Mode - Mock Data
 * 
 * Answer Key:
 * A = Correct (Full mastery)
 * C = Close (Partial understanding)
 * B = Wrong (Needs review)
 */

import { CombatBoss, CombatEncounter } from "@/types/combat";

// Test encounters with intentional answer distribution
export const MOCK_ENCOUNTERS: CombatEncounter[] = [
  {
    id: 1,
    scenario: "What is the primary function of mitochondria in a cell?",
    options: {
      A: "Production of ATP through cellular respiration",
      B: "Storing genetic information",
      C: "Breaking down nutrients to release energy",
      D: "Packaging proteins for transport"
    },
    correct_option: "A",
    win_feedback: "🔥 EXACT! Mitochondria are the powerhouses - they produce ATP through cellular respiration.",
    loss_feedback: "❌ Mitochondria's main role is ATP production. Think about energy conversion."
  },
  {
    id: 2,
    scenario: "During mitosis, what happens to the chromosomes in the metaphase stage?",
    options: {
      A: "They align at the metaphase plate (cell's equator)",
      B: "They separate and move to opposite poles",
      C: "They condense and begin separating at the centromeres",
      D: "They dissolve and disappear"
    },
    correct_option: "A",
    win_feedback: "🔥 CRITICAL HIT! Metaphase is when chromosomes line up perfectly at the center.",
    loss_feedback: "❌ In metaphase, chromosomes align at the metaphase plate. Separation happens in anaphase."
  },
  {
    id: 3,
    scenario: "How do cells communicate with each other using chemical signals?",
    options: {
      A: "Through receptor proteins binding to signaling molecules",
      B: "By physical contact only",
      C: "Via receptors on the cell surface receiving chemical messages",
      D: "Through direct DNA transfer"
    },
    correct_option: "A",
    win_feedback: "🔥 PERFECT! Cell signaling relies on receptors binding to molecules like hormones.",
    loss_feedback: "❌ Cells communicate via receptors binding to chemical signals. This is cell signaling 101."
  },
  {
    id: 4,
    scenario: "What is the role of enzymes in cellular respiration?",
    options: {
      A: "To catalyze reactions and lower activation energy",
      B: "To store energy in ATP molecules",
      C: "To speed up chemical reactions by reducing energy barriers",
      D: "To transport oxygen across cell membranes"
    },
    correct_option: "A",
    win_feedback: "🔥 DEVASTATING! Enzymes are catalysts - they speed up reactions by lowering activation energy.",
    loss_feedback: "❌ Enzymes catalyze reactions by lowering activation energy, not by storing energy."
  },
  {
    id: 5,
    scenario: "Which structure is responsible for protein synthesis in the cell?",
    options: {
      A: "Ribosomes",
      B: "Nucleus",
      C: "Rough endoplasmic reticulum (studded with ribosomes)",
      D: "Golgi apparatus"
    },
    correct_option: "A",
    win_feedback: "🔥 MASTERFUL! Ribosomes are the protein factories of the cell.",
    loss_feedback: "❌ Ribosomes synthesize proteins. While rough ER has ribosomes, the ribosomes do the work."
  },
  {
    id: 6,
    scenario: "What is osmosis in the context of cell membrane function?",
    options: {
      A: "The movement of water across a semipermeable membrane due to concentration gradients",
      B: "The active transport of ions against the concentration gradient",
      C: "Water molecules moving from high to low solute concentration",
      D: "The breakdown of glucose for energy"
    },
    correct_option: "A",
    win_feedback: "🔥 EXCELLENT! Osmosis is water moving to balance solute concentrations.",
    loss_feedback: "❌ Osmosis is about water movement across membranes, not active transport."
  },
  {
    id: 7,
    scenario: "How does the cell membrane control what enters and exits the cell?",
    options: {
      A: "Through selective permeability based on molecular size and charge",
      B: "By blocking all molecules except oxygen",
      C: "Via transport proteins that allow specific molecules through",
      D: "Through random diffusion only"
    },
    correct_option: "A",
    win_feedback: "🔥 SPOT ON! The membrane is selectively permeable - it controls entry and exit.",
    loss_feedback: "❌ The cell membrane uses selective permeability. Transport proteins help specific molecules."
  },
  {
    id: 8,
    scenario: "What is the primary difference between prokaryotic and eukaryotic cells?",
    options: {
      A: "Eukaryotic cells have a membrane-bound nucleus; prokaryotes do not",
      B: "Prokaryotes are larger than eukaryotes",
      C: "Eukaryotes have a nucleus and organelles; prokaryotes lack these structures",
      D: "Only prokaryotes can perform photosynthesis"
    },
    correct_option: "A",
    win_feedback: "🔥 BRILLIANT! The nucleus is the defining feature separating eukaryotes from prokaryotes.",
    loss_feedback: "❌ The key difference is the membrane-bound nucleus in eukaryotes."
  },
  {
    id: 9,
    scenario: "What happens to the surface area-to-volume ratio as a cell grows larger?",
    options: {
      A: "The ratio decreases, which limits cell size",
      B: "The ratio stays constant",
      C: "The ratio increases",
      D: "It has no effect on cell function"
    },
    correct_option: "A",
    win_feedback: "🔥 PERFECT UNDERSTANDING! As cells grow, the ratio decreases, limiting how large they can be.",
    loss_feedback: "❌ As cells grow, the SA:V ratio decreases, creating a limit on cell size."
  },
  {
    id: 10,
    scenario: "Which of the following best describes ATP?",
    options: {
      A: "The primary energy currency of the cell",
      B: "A structural component of the cell membrane",
      C: "A type of enzyme that catalyzes reactions",
      D: "A protein that stores genetic information"
    },
    correct_option: "A",
    win_feedback: "🔥 ABSOLUTELY RIGHT! ATP is the universal energy currency for cellular processes.",
    loss_feedback: "❌ ATP (adenosine triphosphate) is the cell's primary energy currency."
  },
  {
    id: 11,
    scenario: "What is the role of the Golgi apparatus in the cell?",
    options: {
      A: "Protein synthesis and translation",
      B: "Modifying, packaging, and shipping proteins and lipids",
      C: "Breaking down cellular waste",
      D: "Producing ATP for the cell"
    },
    correct_option: "B",
    win_feedback: "🔥 EXACTLY! The Golgi apparatus modifies and packages proteins for transport.",
    loss_feedback: "❌ The Golgi apparatus modifies and packages proteins and lipids for transport. It's like the cell's post office."
  },
  {
    id: 12,
    scenario: "How do lysosomes contribute to cellular homeostasis?",
    options: {
      A: "By synthesizing new proteins",
      B: "By breaking down and recycling cellular waste and damaged organelles",
      C: "By regulating ion balance across membranes",
      D: "By producing energy for the cell"
    },
    correct_option: "B",
    win_feedback: "🔥 SPOT ON! Lysosomes are the cell's cleanup crew - they break down waste.",
    loss_feedback: "❌ Lysosomes are membrane-bound organelles filled with digestive enzymes that break down waste."
  }
];

// Test boss configuration - now supports all 12 encounters, but limits to 9 for heatmap
// (can be extended to show 12 questions aggregated into 9 cells in future)
export const MOCK_TEST_BOSS: CombatBoss = {
  boss_name: "The Cell Cycle Guardian",
  intro_narrative: "You face the Cell Cycle Guardian - a master of cellular biology. Prove your understanding of cells, respiration, and life's fundamental processes.",
  encounters: MOCK_ENCOUNTERS.slice(0, 9) // Default: 9 encounters for 3x3 grid
};

// Extended boss with 12 encounters (for future 9+ question support)
export const MOCK_TEST_BOSS_12: CombatBoss = {
  boss_name: "The Cell Cycle Master",
  intro_narrative: "Face the ultimate Cell Cycle Master - an expert in all aspects of cellular biology and advanced concepts.",
  encounters: MOCK_ENCOUNTERS // All 12 encounters
};

// Sample data structure for displaying heatmap results
export const MOCK_HEATMAP_RESULTS = {
  correct: 6,
  close: 2,
  wrong: 1,
  total: 9
};

/**
 * Generate sample mastery scores showing varied colors
 * Returns 9 scores: 2 low (blue), 3 medium (orange), 4 high (red)
 */
export function generateSampleMasteryScores(): number[] {
  return [
    25,   // Blue (0-33%)
    42,   // Blue (0-33%)
    58,   // Orange (34-66%)
    65,   // Orange (34-66%)
    72,   // Orange (34-66%)
    82,   // Red (67-100%)
    89,   // Red (67-100%)
    95,   // Red (67-100%)
    98    // Red (67-100%)
  ];
}

/**
 * Generate sample results showing mixed correctness
 */
export function generateSampleResults(): ("correct" | "wrong" | "close")[] {
  return [
    "wrong",   // Blue
    "close",   // Blue
    "close",   // Orange
    "correct", // Orange
    "close",   // Orange
    "correct", // Red
    "correct", // Red
    "correct", // Red
    "correct"  // Red
  ];
}

/**
 * Generate sample battle results with staggered correct/close/wrong answers
 * Returns array of 9 encounter results for 3x3 heatmap
 */
export function generateMockBattleLog(
  pattern: "all-correct" | "mixed" | "all-wrong" = "mixed"
) {
  const log = MOCK_ENCOUNTERS.map((encounter, index) => {
    let was_correct: boolean;
    let damage_dealt: number;
    let damage_taken: number;

    if (pattern === "all-correct") {
      was_correct = true;
      damage_dealt = 20;
      damage_taken = 0;
    } else if (pattern === "all-wrong") {
      was_correct = false;
      damage_dealt = 5;
      damage_taken = 15;
    } else {
      // Mixed: A=correct, B=wrong, C=close (treat as correct for simplicity)
      was_correct = index % 3 !== 1; // Every 2nd is wrong (B), others correct
      damage_dealt = was_correct ? 20 : 5;
      damage_taken = was_correct ? 0 : 15;
    }

    return {
      timestamp: Date.now() + index * 1000,
      encounter_id: encounter.id,
      player_choice: was_correct ? "A" : "B",
      was_correct,
      damage_dealt,
      damage_taken,
      feedback: was_correct 
        ? encounter.win_feedback 
        : encounter.loss_feedback
    };
  });

  return log;
}

/**
 * Test mode configuration
 */
export const TEST_MODE_CONFIG = {
  // Enable test mode
  enabled: true,
  
  // Auto-fill sample data
  sampleTitle: "Cell Biology Mastery Challenge",
  sampleContent: `
The cell is the basic unit of life. All living organisms are composed of one or more cells.

MITOCHONDRIA
Mitochondria are membrane-bound organelles found in eukaryotic cells. They are responsible for 
producing ATP (adenosine triphosphate) through cellular respiration. This process involves the 
breakdown of glucose and other molecules to release energy.

CELL DIVISION - MITOSIS
Mitosis is a type of cell division that produces two daughter cells, each with the same number 
of chromosomes as the parent cell. It has four main stages: prophase, metaphase, anaphase, and 
telophase. During metaphase, chromosomes align at the metaphase plate.

CELL SIGNALING
Cells communicate with each other through chemical signals. This process involves signaling 
molecules binding to receptor proteins on the cell surface. The receptor then triggers a 
cascade of events inside the cell.

ENZYMES
Enzymes are proteins that catalyze (speed up) chemical reactions by lowering the activation 
energy required for the reaction to occur. They are essential for cellular respiration and 
many other biological processes.

RIBOSOMES
Ribosomes are the sites of protein synthesis in the cell. They read mRNA and translate it 
into proteins using tRNA molecules.

OSMOSIS
Osmosis is the movement of water across a semipermeable membrane from an area of high water 
concentration (low solute concentration) to an area of low water concentration (high solute 
concentration).

CELL MEMBRANE
The cell membrane is selectively permeable, meaning it controls what enters and exits the cell. 
It uses transport proteins and passive/active transport mechanisms.

PROKARYOTES VS EUKARYOTES
The main difference is that eukaryotic cells have a membrane-bound nucleus containing their DNA, 
while prokaryotic cells do not. Eukaryotes also have other membrane-bound organelles.
  `.trim()
};

/**
 * Mock Clusters for ACRE game structure
 */
export const MOCK_CLUSTERS = [
  {
    id: "cluster-1",
    clusterIndex: 0,
    title: "Cellular Biology Fundamentals",
    description: "Master the basics of cell structure and function",
    status: "unlocked" as const,
    nodes: [
      {
        id: "node-1",
        title: "Cell Structure",
        description: "Understand the parts and organization of cells",
        thermalState: "neutral" as const,
        heat: 0,
        integrity: 0
      },
      {
        id: "node-2",
        title: "Cell Division",
        description: "Learn about mitosis and cell reproduction",
        thermalState: "neutral" as const,
        heat: 0,
        integrity: 0
      },
      {
        id: "node-3",
        title: "Energy Production",
        description: "Understand cellular respiration and ATP",
        thermalState: "neutral" as const,
        heat: 0,
        integrity: 0
      },
      {
        id: "node-4",
        title: "Communication",
        description: "How cells signal and interact",
        thermalState: "neutral" as const,
        heat: 0,
        integrity: 0
      }
    ]
  }
];

/**
 * Crisis Scenarios for ACRE learning challenges
 */
export const MOCK_CRISIS_SCENARIOS = [
  {
    id: "crisis-1",
    nodeId: "cell-structure",
    crisisText: "What is the primary function of mitochondria in a cell?",
    questionType: "multiple-choice" as const,
    actionButtons: [
      { id: "btn-1", label: "Production of ATP through cellular respiration", order: 1 },
      { id: "btn-2", label: "Storing genetic information", order: 2 },
      { id: "btn-3", label: "Breaking down nutrients to release energy", order: 3 },
      { id: "btn-4", label: "Packaging proteins for transport", order: 4 }
    ],
    difficulty: "level-2" as const
  },
  {
    id: "crisis-2",
    nodeId: "cell-division",
    crisisText: "During mitosis, what happens to the chromosomes in the metaphase stage?",
    questionType: "multiple-choice" as const,
    actionButtons: [
      { id: "btn-1", label: "They align at the metaphase plate", order: 1 },
      { id: "btn-2", label: "They separate and move to opposite poles", order: 2 },
      { id: "btn-3", label: "They condense and begin separating", order: 3 },
      { id: "btn-4", label: "They dissolve and disappear", order: 4 }
    ],
    difficulty: "level-2" as const
  },
  {
    id: "crisis-3",
    nodeId: "energy-production",
    crisisText: "How do cells communicate with each other using chemical signals?",
    questionType: "multiple-choice" as const,
    actionButtons: [
      { id: "btn-1", label: "Through receptor proteins binding to signaling molecules", order: 1 },
      { id: "btn-2", label: "By physical contact only", order: 2 },
      { id: "btn-3", label: "Via receptors on the cell surface receiving messages", order: 3 },
      { id: "btn-4", label: "Through direct DNA transfer", order: 4 }
    ],
    difficulty: "level-2" as const
  }
];

/**
 * Evaluate a defense answer for a crisis scenario
 * Returns thermal state, feedback, and formal definition
 */
export function getDefenseEvaluation(
  scenarioId: string,
  actionButtonId: string,
  defenseTextLength: number
): {
  thermalState: "frost" | "warning" | "ignition" | "neutral";
  feedback: string;
  keywords: string[];
  formalDefinition: string;
} {
  // Base evaluation on text length and action chosen
  let thermalState: "frost" | "warning" | "ignition" | "neutral" = "neutral";
  let feedback = "Good effort defending the system.";
  let keywords: string[] = [];
  let formalDefinition = "";

  // Evaluate based on defense text length
  if (defenseTextLength > 100) {
    thermalState = "frost";
    feedback = "❄️ Excellent defense! Your detailed response shows deep understanding.";
    keywords = ["comprehensive", "detailed", "well-structured"];
    formalDefinition =
      "A thorough defense demonstrates mastery through explanation breadth and depth.";
  } else if (defenseTextLength > 50) {
    thermalState = "neutral";
    feedback = "✓ Reasonable defense. Consider adding more detail for better results.";
    keywords = ["adequate", "functional", "needs-expansion"];
    formalDefinition =
      "A moderate defense shows understanding but lacks comprehensive coverage.";
  } else if (defenseTextLength > 20) {
    thermalState = "warning";
    feedback =
      "⚠️ Brief defense detected. More context would strengthen your response.";
    keywords = ["minimal", "brief", "incomplete"];
    formalDefinition =
      "A minimal defense may be interpreted as insufficient system protection.";
  } else {
    thermalState = "ignition";
    feedback =
      "🔥 Critical: Defense is too short. The system requires robust protection.";
    keywords = ["critical", "deficient", "urgent"];
    formalDefinition =
      "Insufficient defense mechanisms leave the system vulnerable to thermal escalation.";
  }

  // Adjust based on action button selection
  if (
    actionButtonId.includes("passive") ||
    actionButtonId.includes("isolate")
  ) {
    if (thermalState !== "frost") {
      thermalState = "neutral";
      feedback = `${feedback} Passive measures are adequate for this scenario.`;
    }
  } else if (
    actionButtonId.includes("active") ||
    actionButtonId.includes("repair")
  ) {
    if (thermalState === "frost") {
      thermalState = "frost";
      feedback = `${feedback} Active intervention shows excellent judgment!`;
    } else {
      thermalState = "neutral";
      feedback = `${feedback} Active measures are appropriate here.`;
    }
  }

  return {
    thermalState,
    feedback,
    keywords,
    formalDefinition
  };
}
