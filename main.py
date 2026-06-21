from analyzer import analyze_message

print("=== PHISHING FIGHTER SYSTEM ===")

message = input("Enter message/email: ")

score, level, reasons = analyze_message(message)

print("\nRisk Score:", score)
print("Level:", level)

if reasons:
    print("\nReasons:")
    for reason in reasons:
        print("-", reason)