import joblib
from train import rf_model,skills_dummies

skills_set=skills_dummies.columns.tolist()

joblib.dump(skills_set,'skills_set.pkl')

joblib.dump(rf_model,'career_predictor.pkl')