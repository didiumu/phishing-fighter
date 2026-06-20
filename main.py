from analyzer import analyze_message

print("=== PHISHING FIGHTER SYSTEM ===")

message = input("Enter message/email: ")

result = analyze_message(message)

print("\nResult:", result)