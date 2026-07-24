// TEXT ANSWER

function submitTextAnswer() {

    let answer =
        document
            .getElementById("userAnswer")
            .value
            .trim();

    let lowerAnswer =
        answer.toLowerCase();

    let words =
        answer
            .split(/\s+/)
            .filter(word => word.length > 0);


    // COMMON VALIDATION

    if (words.length < 5) {

        showFeedback(
            "⚠️ Please write a complete answer with more details.",
            false
        );

        return;

    }


    // CODING VALIDATION

    if (currentType === "coding") {

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
            "range",
            "list",
            "string",
            "python"
        ];

        let foundKeywords =
            codingKeywords.filter(
                keyword =>
                    lowerAnswer.includes(keyword)
            );

        let hasProgrammingSyntax =
            lowerAnswer.includes("=") ||
            lowerAnswer.includes("(") ||
            lowerAnswer.includes(":");


        if (
            foundKeywords.length < 2 ||
            !hasProgrammingSyntax
        ) {

            showFeedback(
                "❌ This does not look like a proper programming solution. Please write the correct logic or Python code.",
                false
            );

            return;

        }

        score++;

        showFeedback(
            "✅ Good! Your answer contains programming logic.",
            true
        );

    }


    // INTERVIEW VALIDATION

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
                "❌ Please give a proper interview answer. Include your education, skills, project, strengths, or career goal.",
                false
            );

            return;

        }


        score++;

        showFeedback(
            "✅ Good answer! Your response contains relevant details.",
            true
        );

    }


    saveProgress();


    document
        .getElementById("nextButton")
        .classList
        .remove("hidden");

                }
