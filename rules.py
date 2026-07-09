PHISHING_RULES = {
    "high_risk": [
        "password",
        "otp",
        "pin",
        "bank",
        "urgent",
        "account",
        "suspended",
        "blocked",
        "verify account"
    ],

    "medium_risk": [
        "verify",
        "login",
        "click here",
        "update",
        "confirm",
        "security check"
    ],
}


def analyze_risk(text):
    text = text.lower()

    score = 0
    reasons = []

    # Check high-risk keywords
    for word in PHISHING_RULES["high_risk"]:
        if word in text:
            score += 30
            reasons.append(word)

    # Check medium-risk keywords
    for word in PHISHING_RULES["medium_risk"]:
        if word in text:
            score += 15
            reasons.append(word)

    # Prevent score from going above 100
    if score > 100:
        score = 100

    # Risk level
    if score >= 60:
        level = "PHISHING"
    elif score >= 30:
        level = "SUSPICIOUS"
    else:
        level = "SAFE"

    return score, level, reasons