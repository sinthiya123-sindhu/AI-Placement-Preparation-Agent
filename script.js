// ================= TEXT ANSWER =================

function submitTextAnswer() {

    let answer =
        document
            .getElementById("userAnswer")
            .value
            .trim();


    // EMPTY ANSWER

    if (answer === "") {

        showFeedback(
            "❌ Please enter your answer.",
            false
        );

        return;

    }


    // ================= CODING =================

    if (currentType === "coding") {

        let question =
            codingQuestions[currentQuestion]
                .toLowerCase();


        let correctCode = "";

        let isCorrect = false;


        // ================= EVEN OR ODD =================

        if (
            question.includes("even or odd")
        ) {

            correctCode =
`n = int(input("Enter a number: "))

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`;


            isCorrect =

                /n\s*=\s*int\s*\(\s*input\s*\(/i
                    .test(answer)

                &&

                /if\s+n\s*%\s*2\s*==\s*0\s*:/i
                    .test(answer)

                &&

                /print\s*\(\s*["']even["']\s*\)/i
                    .test(answer)

                &&

                /else\s*:/i
                    .test(answer)

                &&

                /print\s*\(\s*["']odd["']\s*\)/i
                    .test(answer);

        }


        // ================= LARGEST NUMBER =================

        else if (
            question.includes("largest number")
            &&
            !question.includes("in a list")
        ) {

            correctCode =
`a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
c = int(input("Enter third number: "))

if a >= b and a >= c:
    print(a)
elif b >= a and b >= c:
    print(b)
else:
    print(c)`;


            isCorrect =

                /input\s*\(/i.test(answer)

                &&

                /\bif\b/i.test(answer)

                &&

                /\belif\b/i.test(answer)

                &&

                /\belse\b/i.test(answer)

                &&

                /print\s*\(/i.test(answer)

                &&

                /[<>]=/.test(answer);

        }


        // ================= REVERSE STRING =================

        else if (
            question.includes("reverse a string")
        ) {

            correctCode =
`text = input("Enter a string: ")

reverse = text[::-1]

print(reverse)`;


            isCorrect =

                /input\s*\(/i.test(answer)

                &&

                /[a-zA-Z_]\w*\s*=\s*[a-zA-Z_]\w*\[\s*::\s*-1\s*\]/i
                    .test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= PRIME NUMBER =================

        else if (
            question.includes("prime")
        ) {

            correctCode =
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


            isCorrect =

                /int\s*\(\s*input\s*\(/i
                    .test(answer)

                &&

                /\bif\s+n\s*>\s*1\s*:/i
                    .test(answer)

                &&

                /\bfor\b.*\brange\s*\(/is
                    .test(answer)

                &&

                /%\s*i\s*==\s*0/i
                    .test(answer)

                &&

                /\belse\s*:/i
                    .test(answer);

        }


        // ================= FACTORIAL =================

        else if (
            question.includes("factorial")
        ) {

            correctCode =
`n = int(input("Enter a number: "))

factorial = 1

for i in range(1, n + 1):
    factorial = factorial * i

print(factorial)`;


            isCorrect =

                /int\s*\(\s*input\s*\(/i
                    .test(answer)

                &&

                /factorial\s*=\s*1/i
                    .test(answer)

                &&

                /for\s+i\s+in\s+range\s*\(/i
                    .test(answer)

                &&

                /factorial\s*=\s*factorial\s*\*\s*i/i
                    .test(answer)

                &&

                /print\s*\(/i
                    .test(answer);

        }


        // ================= SUM OF LIST =================

        else if (
            question.includes("sum of a list")
        ) {

            correctCode =
`numbers = [1, 2, 3, 4, 5]

total = 0

for number in numbers:
    total = total + number

print(total)`;


            isCorrect =

                /\[\s*.*\s*\]/s.test(answer)

                &&

                /\bfor\b/i.test(answer)

                &&

                /total\s*=\s*0/i.test(answer)

                &&

                /total\s*=\s*total\s*\+/i.test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= COUNT VOWELS =================

        else if (
            question.includes("count vowels")
        ) {

            correctCode =
`text = input("Enter a string: ")

count = 0

for char in text:
    if char in "aeiou":
        count += 1

print(count)`;


            isCorrect =

                /input\s*\(/i.test(answer)

                &&

                /count\s*=\s*0/i.test(answer)

                &&

                /\bfor\b/i.test(answer)

                &&

                /\bif\b/i.test(answer)

                &&

                /aeiou/i.test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= PALINDROME =================

        else if (
            question.includes("palindrome")
        ) {

            correctCode =
`text = input("Enter a string: ")

if text == text[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")`;


            isCorrect =

                /input\s*\(/i.test(answer)

                &&

                /[::-1]/.test(answer)

                &&

                /==/.test(answer)

                &&

                /\bif\b/i.test(answer)

                &&

                /\belse\b/i.test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= LARGEST IN LIST =================

        else if (
            question.includes("largest number in a list")
        ) {

            correctCode =
`numbers = [10, 25, 5, 40, 15]

largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number

print(largest)`;


            isCorrect =

                /\[\s*.*\s*\]/s.test(answer)

                &&

                /largest\s*=/i.test(answer)

                &&

                /\bfor\b/i.test(answer)

                &&

                /\bif\b/i.test(answer)

                &&

                />/.test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= FIBONACCI =================

        else if (
            question.includes("fibonacci")
        ) {

            correctCode =
`n = int(input("Enter number of terms: "))

a = 0
b = 1

for i in range(n):
    print(a)
    a, b = b, a + b`;


            isCorrect =

                /int\s*\(\s*input\s*\(/i
                    .test(answer)

                &&

                /a\s*=\s*0/i.test(answer)

                &&

                /b\s*=\s*1/i.test(answer)

                &&

                /\bfor\b/i.test(answer)

                &&

                /range\s*\(/i.test(answer)

                &&

                /print\s*\(/i.test(answer);

        }


        // ================= RESULT =================

        if (
            isCorrect
        ) {

            score++;

            showFeedback(
                "✅ Correct! Your Python code is correct. Excellent work! 🎉",
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

                💡 Please compare your logic with the correct solution and try again.
                `,
                false
            );

            return;

        }

    }


    // ================= INTERVIEW =================

    else if (
        currentType === "interview"
    ) {

        let lowerAnswer =
            answer.toLowerCase();


        let words =
            answer
                .split(/\s+/)
                .filter(
                    word => word.length > 0
                );


        if (
            words.length < 5
        ) {

            showFeedback(
                "❌ Please provide a complete interview answer with more details.",
                false
            );

            return;

        }


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


        if (
            foundKeywords.length < 2
        ) {

            showFeedback(
                `
                ❌ Your answer needs more relevant details.

                <br><br>

                💡 Include:
                <br>
                • Education
                <br>
                • Skills
                <br>
                • Projects
                <br>
                • Strengths
                <br>
                • Career goals
                `,
                false
            );

            return;

        }


        score++;

        showFeedback(
            "✅ Good interview answer! Your response contains relevant details. 🎉",
            true
        );

    }


    // ================= SAVE CORRECT ANSWER =================

    saveProgress();


    document
        .getElementById("nextButton")
        .classList
        .remove("hidden");

    }
