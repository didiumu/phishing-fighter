PHISHING_RULES = {
    "high_risk": ["password", "otp", "bank", "urgent", "account suspended"],
    "medium_risk": ["verify", "login", "click here", "update"],
}

def get_risk_level(text):
    text = text.lower()

    high = 0
    medium = 0

    for word in PHISHING_RULES["high_risk"]:
        if word in text:
            high += 1

    for word in PHISHING_RULES["medium_risk"]:
        if word in text:
            medium += 1

    if high >= 2:
        return " PHISHING (HIGH RISK)"
    elif high == 1 or medium >= 2:
        return " SUSPICIOUS"
    else:
        return " SAFE"