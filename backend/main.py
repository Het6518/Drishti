from fastapi import FastAPI
from pydantic import BaseModel
from triage import rule_based_triage
from typing import List
import pickle
import os


from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "ml", "model.pkl"), "rb") as f:
    ml_model = pickle.load(f)

with open(os.path.join(BASE_DIR, "ml", "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)


user_profile = {}

app = FastAPI(
    title="Drishti",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Profile(BaseModel) :
  age: int
  height_cm: int 
  weight_kg: int
  conditions: List[str] =[]

@app.post("/profile")
def save_profile(profile: Profile):
    global user_profile
    user_profile = profile.dict()
    return {
        "message": "Profile saved successfully",
        "profile": user_profile
    }

class AnalyzeRequest(BaseModel) :
  symptoms: str
  age: int

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    age = data.age

    if user_profile:
        age = user_profile.get("age", age)
        conditions = user_profile.get("conditions", [])
    else:
        conditions = []

    # Vectorize input
    X = vectorizer.transform([data.symptoms])

    # Predict urgency
    urgency = ml_model.predict(X)[0]

    # Confidence score
    probs = ml_model.predict_proba(X)[0]
    confidence = float(max(probs))  # convert numpy float → JSON safe

    # Profile-based escalation
    if urgency == "MODERATE" and conditions:
        urgency = "HIGH"

    return {
        "urgency": urgency,
        "confidence": confidence,
        "based_on_profile": bool(user_profile),
        "disclaimer": "This is not medical advice."
    }
