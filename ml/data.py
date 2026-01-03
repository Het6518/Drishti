
import random
import pandas as pd

LOW_SYMPTOMS = ["mild cough", "sneezing", "runny nose"]
MODERATE_SYMPTOMS = ["fever", "headache", "vomiting"]
HIGH_SYMPTOMS = ["chest pain", "difficulty breathing", "loss of consciousness"]

def generate_data(n=1000):
    rows = []

    for _ in range(n):
        category = random.choice(["LOW", "MODERATE", "HIGH"])

        if category == "LOW":
            symptoms = random.choice(LOW_SYMPTOMS)
            age = random.randint(5, 40)
            conditions = 0

        elif category == "MODERATE":
            symptoms = random.choice(MODERATE_SYMPTOMS)
            age = random.randint(15, 60)
            conditions = random.choice([0, 1])

        else:
            symptoms = random.choice(HIGH_SYMPTOMS)
            age = random.randint(40, 90)
            conditions = random.choice([1, 2])

        rows.append([symptoms, age, conditions, category])

    return pd.DataFrame(rows, columns=["symptoms", "age", "conditions", "urgency"])


if __name__ == "__main__":
    df = generate_data()
    df.to_csv("data.csv", index=False)
    print("Dataset created:", df.shape)
