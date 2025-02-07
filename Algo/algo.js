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

// Usage example
const rules = {
    3 : "Fizz",
    5 : "Buzz",
}

fizzbuzz(20, rules)