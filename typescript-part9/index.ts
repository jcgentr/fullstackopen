import { calculateBMI } from "./utils";
import { calculator, Operation } from "./calculator";
import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("PONG");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBMI(height, weight);
  res.json({
    height,
    weight,
    bmi,
  });
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "invalid input" });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
