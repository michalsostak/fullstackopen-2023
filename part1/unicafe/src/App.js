import { useState } from 'react'

const Heading = (props) => <h1>{props.title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const textGood = "good";
  const textNeutral = "neutral";
  const textBad = "bad";
  const textAll = "all";
  const textAverage = "average";
  const textPositive = "positive";
  const textEmpty = "No feedback given";

  const totalValue = good + neutral + bad;
  const averageValue = totalValue !== 0 ? (good - bad) / totalValue : 0;
  const positivePercentageValue = totalValue !== 0 ? `${good / totalValue * 100} %` : "0 %";

  if (good === 0 && neutral === 0 && bad === 0) {
    return (<div>{textEmpty}</div>)
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text={textGood} value={good} />
        <StatisticsLine text={textNeutral} value={neutral} />
        <StatisticsLine text={textBad} value={bad} />
        <StatisticsLine text={textAll} value={totalValue} />
        <StatisticsLine text={textAverage} value={averageValue} />
        <StatisticsLine text={textPositive} value={positivePercentageValue} />
      </tbody>
    </table>
  )

}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackTitle = "give feedback";
  const statisticsTitle = "statistics";

  const buttonTextGood = "good";
  const buttonTextNeutral = "neutral";
  const buttonTextBad = "bad";

  return (
    <div>
      <Heading title={feedbackTitle} />
      <Button handleClick={() => setGood(good + 1)} text={buttonTextGood} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={buttonTextNeutral} />
      <Button handleClick={() => setBad(bad + 1)} text={buttonTextBad} />
      <Heading title={statisticsTitle} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App