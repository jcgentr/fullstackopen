import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <div>
        <Anecdotes />
      </div>
    </div>
  );
};

export default App;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={all} />
            <StatisticLine
              text={"average"}
              value={((good * 1 + bad * -1) / all).toFixed(1)}
            />
            <StatisticLine
              text={"positive"}
              value={((good / all) * 100).toFixed(1) + "%"}
            />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Anecdotes = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [selected, setSelected] = useState(0);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const maxVotes = Math.max(...votes);
  const maxVotesAnecdote = anecdotes[votes.findIndex((el) => el === maxVotes)];

  return (
    <div>
      <h1>Anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <Button onClick={handleVote} text="vote" />
      <Button
        onClick={() => setSelected(getRandomInt(anecdotes.length))}
        text="next anecdote"
      />
      <p>has {votes[selected]} votes</p>

      <h1>Anecdotes with most votes</h1>
      <p>{maxVotesAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};
