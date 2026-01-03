HIGH_RISK = [
    "chest pain",
    "difficulty breathing",
    "loss of consciousness"
]

MEDIUM_RISK = [
    "fever",
    "vomiting",
    "headache"
]

def rule_based_triage(symptoms: str, age: int):
    symptoms = symptoms.lower()

    for s in HIGH_RISK:
        if s in symptoms:
            return "HIGH"

    for s in MEDIUM_RISK:
        if s in symptoms:
            return "MODERATE"

    if age > 60:
        return "MODERATE"

    return "LOW"
