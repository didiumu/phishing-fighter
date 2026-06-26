import pandas as pd
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

print("Loading dataset...")

data = pd.read_csv("dataset.csv")

X = data["message"]
y = data["label"]

vectorizer = CountVectorizer()
X_vector = vectorizer.fit_transform(X)

model = MultinomialNB()
model.fit(X_vector, y)

# SAVE MODEL
joblib.dump(model, "phishing_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model trained successfully!")