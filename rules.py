PHISHING_RULES = {
    "high_risk": ["password", "otp", "bank", "urgent", "account suspended"],
    "medium_risk": ["verify", "login", "click here", "update"],
}

def analyze_risk(text):
    text = text.lower()

    score = 0
    reasons = []

    for word in PHISHING_RULES["high_risk"]:
        if word in text:
            score += 30
            reasons.append(word)

    for word in PHISHING_RULES["medium_risk"]:
        if word in text:
            score += 15
            reasons.append(word)

    if score >= 60:
        level = " PHISHING"
    elif score >= 30:
        level = " SUSPICIOUS"
    else:
        level = " SAFE"

    return score, level, reasons