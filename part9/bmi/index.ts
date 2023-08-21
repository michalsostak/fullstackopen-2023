import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight; 

  if ( !height || !weight || isNaN(Number(height)) || isNaN(Number(weight)) ) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const heightInCm = Number(height);
  const weightInKg = Number(weight);

  const result = calculateBmi(heightInCm, weightInKg);
  return res.send({ weight: weightInKg, height: heightInCm, bmi: result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises: request_daily_exercises, target: request_target  } = req.body;

  if ( !request_target || !request_daily_exercises) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if ( isNaN(Number(request_target)) || !Array.isArray(request_daily_exercises) || !request_daily_exercises.map((value: unknown) => isNaN(Number(value))).every((value: unknown) => !value) ) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const target: number = Number(request_target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const daily_exercises: number[] = request_daily_exercises.map((num: unknown) => Number(num));

  const result = calculateExercises(target, daily_exercises);
  return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});