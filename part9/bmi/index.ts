import express from 'express';
import { calculateBmi } from './bmiCalculator';

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


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});