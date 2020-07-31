import express from 'express';
import { calculateBmi, parseBmi} from './bmiCalculator';
import { calculateExercises, parseExerciseData } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

interface objectInterface {
  height: number | undefined;
  weight: number | undefined;
}
interface exerciseInterface {
  daily_exercises: number[] | undefined,
  target: number | undefined
}
app.get('/bmi', (req, res) => {
  const objects = getInput(Object(req.query));
  const height = objects.height;
  const weight = objects.weight;

  try {
    const { value1, value2 } = parseBmi([height, weight]);
    res.send(calculateBmi(value1, value2));
  } catch (e) {
    res.send({
      error: 'malformatted arguments'
    });
  }
});

app.post('/exercises', (req, res) => {
  const args = getRequest(req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = parseExerciseData(args);
    res.send(calculateExercises(daily_exercises, target));
  } catch (e) {
    res.send({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error: e.message
    });
  }
});

const getRequest = (body: exerciseInterface): exerciseInterface => {
  if (body.daily_exercises && body.target) {
    return {
      daily_exercises: body.daily_exercises,
      target: Number(body.target)
    };
  } else {
    return  {
      daily_exercises: undefined,
      target: undefined
    };
  }
};

const getInput = (query: objectInterface): objectInterface => {
  if( !isNaN(Number(query.height)) && !isNaN(Number(query.weight))) {
    return { height: Number(query.height), weight: Number(query.weight)};
  } else {
    return { height: undefined, weight: undefined };
  }
};
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});