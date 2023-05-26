type BmiCategory =
  | "Underweight"
  | "Normal weight"
  | "Pre-obesity" // or Overweight
  | "Obesity class I"
  | "Obesity class II"
  | "Obesity class III";

function calculateBmi(height: number, weight: number): BmiCategory {
  let heightInMeters = height / 100; // convert height from cm to meters
  let bmi = weight / (heightInMeters * heightInMeters); // formula for BMI
  console.log({ bmi });

  // Based on the BMI, determine the category and return the appropriate message
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Pre-obesity";
  } else if (bmi >= 30 && bmi < 34.9) {
    return "Obesity class I";
  } else if (bmi >= 35 && bmi < 39.9) {
    return "Obesity class II";
  } else {
    return "Obesity class III";
  }
}
// 5'10'' -> 177.8 cm
// 200 lbs -> 90.7 kg
// console.log(calculateBmi(177.8, 90.7));

const parseArgs = (
  args: string[]
): {
  value1: number;
  value2: number;
} => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { value1, value2 } = parseArgs(process.argv);
  const bmiClassification = calculateBmi(value1, value2);
  console.log(bmiClassification);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
