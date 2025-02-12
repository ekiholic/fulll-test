## Fulll's test
This project includes two main components: **Algorithm** and **Backend/Node**.

### [Algo] FizzBuzz
The FizzBuzz algorithm follows basic rules for displaying numbers based:
- if number can be divided by 3: display **Fizz** ;
- if number can be divided by 5: display **Buzz** ;
- if number can be divided by 3 **AND** 5 : display **FizzBuzz** ;
- else: display the number.

In this version of FizzBuzz, you can easily **edit or add as many rules as you want** by modifying the `rules` object in the `algo.ts` file.

### To run the Algorithm:
1. Install dependencies:
```shell
npm install
```

2. Compile the TypeScript file to JavaScript, then run the compiled JavaScript file with a number as argument :
```shell
tsc algo.ts
node algo.js [number]
```
Replace [number] with the desired input for the algorithm.

## [Backend/Node] Vehicle fleet parking management
This application allows you to manage fleets of vehicles. It can:

- **Create a fleet** for a specific user.
- **Register a vehicle** to a fleet.
- **Localize a vehicle** by updating its location with latitude, longitude, and altitude (optional).

### Getting Started

Install dependencies:
```shell
npm install
```
To run the tests:
```shell
npx tsc
npm test
```

To use the App:
```shell
chrmod +x fleet
./fleet create <userId>
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

## Continuous Integration (CI)

This project uses **GitHub Actions** for Continuous Integration to automate the process of building, testing, and linting the codebase across multiple Node.js versions.

### Workflow Overview

1. **Checkout Code**: The code is checked out from the repository.
2. **Set Up Node.js**: The workflow sets up different versions of Node.js (18.x, 20.x, and 22.x) for testing.
3. **Install Dependencies**: Dependencies are installed using `npm ci`.
4. **TypeScript Compilation**: The TypeScript code is compiled with `npx tsc`.
5. **Run Tests**: Executes Gherkin-based tests to ensure functionality.
6. **Run ESLint**: Checks code quality using ESLint.