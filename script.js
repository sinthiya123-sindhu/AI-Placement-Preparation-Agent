// ================= TEXT ANSWER =================

function submitTextAnswer() {

    let answer =
        document
            .getElementById("userAnswer")
            .value
            .trim();

    let lowerAnswer =
        answer.toLowerCase();


    // ================= CODING =================

    if (currentType === "coding") {

        let question =
            codingQuestions[currentQuestion].toLowerCase();


        // ================= EVEN OR ODD =================

        if (question.includes("even or odd")) {

            let correctCode =
`n = int(input("Enter a number: "))

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`;


            let hasInput =
                /int\s*\(\s*input\s*\(/i.test(answer);

            let hasCondition =
                /%\s*2\s*==\s*0/.test(answer);

            let hasIf =
                /\bif\b/i.test(answer);

            let hasElse =
                /\belse\b/i.test(answer);

            let hasEven =
                /print\s*\(\s*["']even["']\s*\)/i.test(answer);

            let hasOdd =
                /print\s*\(\s*["']odd["']\s*\)/i.test(answer);


            if (
                hasInput &&
                hasCondition &&
                hasIf &&
                hasElse &&
                hasEven &&
                hasOdd
            ) {

                score++;

                showFeedback(
                    "✅ Correct! Your Python logic is correct. Excellent work! 🎉",
                    true
                );

            } else {

                showFeedback(
                    `
                    ❌ Your code is incorrect.

                    <br><br>

                    <b>✅ Correct Python Code:</b>

                    <pre>${correctCode}</pre>

                    <br>

                    💡 Check the input, condition, if/else logic, and output.
                    `,
                    false
                );

                return;

            }

        }


        // ================= REVERSE STRING =================

        else if (question.includes("reverse a string")) {

            let correctCode =
`text = input("Enter a string: ")

reverse = text[::-1]

print(reverse)`;


            if (
                /input\s*\(/i.test(answer) &&
                /\[\s*::\s*-1\s*\]/.test(answer) &&
                /print\s*\(/i.test(answer)
            ) {

                score++;

                showFeedback(
                    "✅ Correct! Your string reversal logic is correct. 🎉",
                    true
                );

            } else {

                showFeedback(
                    `
                    ❌ Your code is incorrect.

                    <br><br>

                    <b>✅ Correct Python Code:</b>

                    <pre>${correctCode}</pre>
                    `,
                    false
                );

                return;

            }

        }


        // ================= PRIME =================

        else if (question.includes("prime")) {

            let correctCode =
`n = int(input("Enter a number: "))

if n > 1:
    for i in range(2, n):
        if n % i == 0:
            print("Not Prime")
            break
    else:
        print("Prime")
else:
    print("Not Prime")`;


            if (
                /int\s*\(\s*input\s*\(/i.test(answer) &&
                /\bfor\b/i.test(answer) &&
                /range\s*\(/i.test(answer) &&
                /%\s*.*==\s*0/.test(answer) &&
                /\bif\b/i.test(answer)
            ) {

                score++;

                showFeedback(
                    "✅ Correct! Your prime number logic is correct. 🎉",
                    true
                );

            } else {

                showFeedback(
                    `
                    ❌ Your code is incorrect.

                    <br><br>

                    <b>✅ Correct Python Code:</b>

                    <pre>${correctCode}</pre>
                    `,
                    false
                );

                return;

            }

        }


        // ================= FACTORIAL =================

        else if (question.includes("factorial")) {

            let correctCode =
`n = int(input("Enter a number: "))

factorial = 1

for i in range(1, n + 1):
    factorial = factorial * i

print(factorial)`;


            if (
                /int\s*\(\s*input\s*\(/i.test(answer) &&
                /factorial\s*=\s*1/i.test(answer) &&
                /\bfor\b/i.test(answer) &&
                /range\s*\(/i.test(answer) &&
                /print\s*\(/i.test(answer)
            ) {

                score++;

                showFeedback(
                    "✅ Correct! Your factorial logic is correct. 🎉",
                    true
                );

            } else {

                showFeedback(
                    `
                    ❌ Your code is incorrect.

                    <br><br>

                    <b>✅ Correct Python Code:</b>

                    <pre>${correctCode}</pre>
                    `,
                    false
                );

                return;

            }

        }


        // ================= OTHER CODING QUESTIONS =================

        else {

            let codingKeywords = [
                "print",
                "if",
                "else",
                "for",
                "while",
                "def",
                "return",
                "input",
                "int",
                "range"
            ];

            let foundKeywords =
                codingKeywords.filter(
                    keyword =>
                        lowerAnswer.includes(keyword)
                );


            if (foundKeywords.length < 2) {

                showFeedback(
                    "❌ This is not a proper Python solution. Please write correct Python code.",
                    false
                );

                return;

            }


            score++;

            showFeedback(
                "✅ Good! Your answer contains programming logic. 🎉",
                true
            );

        }

    }


    // ================= INTERVIEW =================

    else if (currentType === "interview") {

        let keywords = [
            "student",
            "education",
            "college",
            "skill",
            "python",
            "sql",
            "html",
            "css",
            "javascript",
            "project",
            "experience",
            "goal",
            "strength",
            "learn",
            "company",
            "career"
        ];


        let foundKeywords =
            keywords.filter(
                keyword =>
                    lowerAnswer.includes(keyword)
            );


        if (foundKeywords.length < 2) {

            showFeedback(
                `
                ❌ Please provide more details.

                <br><br>

                💡 Include your education, skills, projects, strengths, or career goals.
                `,
                false
            );

            return;

        }


        score++;

        showFeedback(
            "✅ Good answer! Your response contains relevant details. 🎉",
            true
        );

    }


    // ================= SAVE ONLY CORRECT ANSWERS =================

    saveProgress();


    document
        .getElementById("nextButton")
        .classList
        .remove("hidden");

                }
