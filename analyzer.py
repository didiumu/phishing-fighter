from rules import get_risk_level

def analyze_message(message):
    return get_risk_level(message)