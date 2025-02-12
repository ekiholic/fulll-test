// Rules format
type Rules = Record<number, string>;

// Prints number from 1 to n with rules.
function fizzbuzz(n: number, rules: Rules): void {
    if (!n || isNaN(n)) {
        console.error("Please enter valid number");
        process.exit(1);
    } else if (n <= 0) {
        console.error("Number must be higher than 1");
        process.exit(1);
    }

    for (let i = 1; i <= n; i++) {
        let output: string = "";
        for (const [divisor, word] of Object.entries(rules)) {
            if (i % Number(divisor) === 0) {
                output += word;
            }
        }
        console.log(output || i);
    }
}

// FizzBuzz rules { [divisor]: [word] }
const rules: Rules = {
    3: "Fizz",
    5: "Buzz",
}

fizzbuzz(Number(process.argv[2]), rules);