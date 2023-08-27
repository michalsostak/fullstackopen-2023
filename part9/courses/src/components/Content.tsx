import { CoursePart } from "../App";
import Part from "./Part";

interface ContentArrayProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentArrayProps) => (
  <>
    {props.courseParts.map((part) => (
      <Part key={part.name} coursePart={part} />
    ))}
  </>
);

export default Content;
