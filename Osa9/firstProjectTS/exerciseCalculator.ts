interface ObjectToReturn {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  raiting: number;
  raitingDescription: string;
  target: number;
  average: number;
}
interface ValuesExercise {
  daily_exercises: number[] ;
  target: number;
}
interface Values {
  daily_exercises: number[] | undefined;
  target: number | undefined;
}


export const parseExerciseData = (args: Values): ValuesExercise => {
  const days = args.daily_exercises;
  if (!days) {
    throw new Error('Not enough arguments');
  }
  if (!args.target) {
    throw new Error('Not enough arguments');
  }
  const daysInNumber = days.map(each => Number(each));
  const check = daysInNumber.filter(each => isNaN(each));
  if (!isNaN(Number(args.target)) && check.length === 0) {
    return {
      daily_exercises: daysInNumber,
      target: Number(args.target),
    };
  } else {
    throw new Error('malformatted parameters');
  }
};
// Exercise 9.3 need this.
// const parseExerciseArguments = (args: Array<string>): ValuesExercise => {
//   console.log(args.length);
//   if (args.length < 4) throw new Error('Not enough argumnets');

//   const [first, second, third, ...rest] = args;
//   console.log(first, second);
//   let days = [];
//   days = rest.map(each => Number(each));
//   const check = days.filter(each => isNaN(each));
//   if (!isNaN(Number(third)) && check.length === 0) {
//     return {
//       value1: days,
//       value2: Number(third),
//     };
//   } else {
//     throw new Error('All values in array and target value should be numbers!');
//   }
// };

export const calculateExercises = (hours: number[], target: number): ObjectToReturn => {
  if (target === 0) throw new Error('target must me more than 0 hours');
  const sum = hours.reduce((a,b) => a + b, 0);
  const trainingDays = hours.filter(h => h > 0);
  const average = sum/hours.length;
  let success = false;
  let raiting = 1;
  let description = 'quite sad, this could be much better!';

  if (average/target < 0) {
    throw new Error('something went wrong, traininghours or target was negative');
  } else if (average/target < 1 && average/target >= 0.5) {
    raiting = 2;
    description = 'Not too bad but you could do it better.';
  } else if (average/target >= 1) {
    raiting = 3;
    success = true;
    description = 'You have reached your goal. Well done!';
  } 
  return {
    periodLength: hours.length,
    trainingDays: trainingDays.length,
    success: success,
    raiting: raiting,
    raitingDescription: description,
    target: target,
    average: average
  };
};


// Exercise 9.3 need this.
// try {
//   const { value1, value2 } = parseExerciseArguments(process.argv);
//   console.log(calculateExercises(value1, value2));
// } catch (e) {
//   console.log(e);
// }