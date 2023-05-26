type BMICategory =
  | "Underweight"
  | "Normal weight"
  | "Pre-obesity" // or Overweight
  | "Obesity class I"
  | "Obesity class II"
  | "Obesity class III";

export function calculateBMI(height: number, weight: number): BMICategory {
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
