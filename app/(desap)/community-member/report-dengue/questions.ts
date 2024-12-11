export const questions = [
    {
        question: "1. Have you experienced mosquito bites within the previous 2 weeks?",
        options: ["Yes", "No"],
        points: [10, 0],
    },
    {
        question: "2. Do you have a fever?",
        options: ["39℃ or higher", "37℃ - 38℃", "less than 37℃ but bit higher than usual", "No"],
        points: [10, 5, 2, 0],
    },
    {
        question: "3. Have you experienced biphasic fever (fever that comes and goes)?",
        options: ["Yes", "No"],
        points: [10, 0],
    },
    {
        question: "4. Do you have joint pain?",
        options: ["Severe (e.g., making movement difficult)", "Mild", "No"],
        points: [10, 4, 0],
    },
    {
        question: "5. Do you have a headache?",
        options: ["Severe", "Mild", "No"],
        points: [4, 2, 0],
    },
    {
        question: "6. Do you have retroorbital pain (pain behind the eyes)?",
        options: ["Severe", "Mild", "No"],
        points: [8, 3, 0],
    },
    {
        question: "7. Do you have muscle pain?",
        options: ["Severe (not because of sports)", "Mild", "No"],
        points: [8, 3, 0],
    },
    {
        question: "8. Do you have any rash? Choose all that apply.",
        options: ["Thorax", "Torso", "Back", "Limbs", "Face", "No"],
        points: [3, 3, 3, 3, 3, 0], // 3 points per selected area
    },
    {
        question: "9. If you have rashes, what does it look like?",
        options: ["Skin color islands in red sea", "Other", "No, don't have any rash"],
        points: [10, 5, 0],
    },
    {
        question: "10. When did the rash appear in relation to your fever?",
        options: ["Rash appeared after the fever subsided", "Rash appeared during the fever", "I have no fever or rash"],
        points: [10, 5, 0],
    },
    {
        question: "11. Have you experienced nausea or vomiting?",
        options: ["Frequent vomiting", "Occasional nausea", "Neither nausea nor vomiting"],
        points: [4, 2, 0],
    },
    {
        question: "12. Do you feel bloating or discomfort in your abdomen?",
        options: ["Severe abdominal pain or swelling", "Mild bloating or discomfort", "No abdominal discomfort"],
        points: [4, 2, 0],
    },
    {
        question: "13. Do you have a sore throat?",				// if have, the risk of dengue gains
        options: ["Yes", "No"],
        points: [-20, 0],
    },
    {
        question: "14. Do you have any respiratory symptoms?",	// if have, the risk of dengue gains
        options: ["Yes", "No"],
        points: [-20, 0],
    },
    {
        question: "15. Have you experienced unusual bleeding (e.g., nosebleeds, gum bleeding, or blood in stools)?",
        options: ["Frequent or severe", "Occasional (e.g., minor nosebleeds)", "No unusual bleeding"],
        points: [15, 4, 0],
    },
];