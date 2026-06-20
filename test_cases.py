from analyzer import analyze_message

tests = [
    "Your bank account is suspended, urgent action required",
    "Hello, how are you today?",
    "Verify your OTP to continue login"
]

for t in tests:
    print("\nMessage:", t)
    print("Result:", analyze_message(t))