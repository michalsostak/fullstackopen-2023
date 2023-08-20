export const calculateBmi = (height: number, weight: number): string => {
  const heightInMetres: number = height/100
  const bmi: number = weight / (heightInMetres * heightInMetres)
  switch (true) {
    case bmi < 18.5:
      return 'Underweight'
    case 25 > bmi && bmi >= 18.5:
      return 'Normal (healthy weight)'
    case 30 > bmi && bmi >= 25:
      return 'Overweight'
    case bmi >= 30:
      return 'Obese'
    }
}

console.log(calculateBmi(180, 74))