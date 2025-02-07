// Checking if rules object has the correct format.
function checkRules(rules) {
    if (typeof rules !== "object" || rules === null) {
        return false;
    }
    for (const [key, value] of Object.entries(rules)) {
        if (Number.isNaN(Number(key)) || typeof value !== "string") {
            return false
        }
    }
    return true;
}

// Prints number from 1 to n with rules.
function fizzbuzz(n, rules) {
    if (typeof n !== "number" || !checkRules(rules)) {
        console.error("Invalid type");
        return;
    }
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (const [divisor, word] of Object.entries(rules)) {
            if (i % divisor === 0) {
                output += word;
            }
        }
        console.log(output || i);
    }
}