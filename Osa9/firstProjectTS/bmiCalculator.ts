interface ReturnObject {
  weight: number;
  height: number;
  bmi: string;
}

interface Values {
  value1: number;
  value2: number;
}

// Exercise 9.3 need this.
// const parseBmiArguments = (args: Array<string>): Values => {
//   if (args.length > 4) throw new Error('Too many argumets');
//   if (args.length < 4) throw new Error('Not enough argumnets');
  
//   if (!isNaN(Number(args[3]))&&!isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3])
//     };
//   } else {
//     throw new Error('All values in array and target value should be numbers!');
//   }
// }

export const parseBmi = (args: (number | string | undefined)[]): Values => {
  if (args.length > 2) throw new Error('Too many argumets');
  if (args.length < 2) throw new Error('Not enough argumnets');
  
  if (!isNaN(Number(args[1]))&&!isNaN(Number(args[0]))) {
    return {
      value1: Number(args[0]),
      value2: Number(args[1])
    };
  } else {
    throw new Error("malformatted parameters");
  }
};
export const calculateBmi = (height: number, weight: number): ReturnObject => {
  if (weight < 0 || height < 0) throw new Error('Weight and height can not be 0 or negative');
  const heightInMeters =  (height/100)*(height/100);
  const bmiIndex = weight/heightInMeters;

  let bmi = '';
  if (bmiIndex < 18.5) {
    bmi = 'Underweight (unhealthy weight)';
  } else if (18.5 <= bmiIndex && bmiIndex < 25) {
    bmi = 'Normal (healthy weigth)';
  } else if (bmiIndex >= 25 && bmiIndex < 30) {
    bmi = 'Overweight (unhealthy weight)';
  } else if (bmiIndex >= 30) {
    bmi = 'Obese (very unhealthy weight)';
  } else {
    throw new Error('Something went wrong, bmi can not be negative');
  }
  return {
    weight: weight,
    height: height,
    bmi: bmi,
  };
};
// Exercise 9.3 need this.
// try {
//   const { value1, value2 } = parseBmiArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }