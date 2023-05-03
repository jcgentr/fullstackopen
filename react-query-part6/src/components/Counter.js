import {
  CounterContextProvider,
  useCounterDispatch,
  useCounterValue,
} from "../CounterContext";

export const Counter = () => {
  return (
    <CounterContextProvider>
      <div>
        <h2>Counter</h2>
        <Display />
        <div>
          <Button type="INC" label="+" />
          <Button type="DEC" label="-" />
          <Button type="ZERO" label="0" />
        </div>
      </div>
    </CounterContextProvider>
  );
};

const Display = () => {
  const counter = useCounterValue();
  return <div>{counter}</div>;
};

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};
