interface TotalArrayProps {
  courseParts: TotalProps[];
}

interface TotalProps {
  name: string;
  exerciseCount: number;
}

const Total = (props: TotalArrayProps) => (
  <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
