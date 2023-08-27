import { CoursePart } from "../App";

interface CoursePartProps {
  coursePart: CoursePart;
}

const Part = (props: CoursePartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const { coursePart } = props;
  const contentByType = () => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <>
            <div>
              <strong>
                {coursePart.name} {coursePart.exerciseCount}
              </strong>
              <div>
                <i>{coursePart.description}</i>
              </div>
            </div>
          </>
        );
      case "group":
        return (
          <>
            <div>
              <strong>
                {coursePart.name} {coursePart.exerciseCount}
              </strong>
            </div>
            <div>project exercises {coursePart.groupProjectCount}</div>
          </>
        );
      case "background":
        return (
          <>
            <div>
              <strong>
                {coursePart.name} {coursePart.exerciseCount}
              </strong>
            </div>
            <div>
              <i>{coursePart.description}</i>
            </div>
            <div>background material {coursePart.backgroundMaterial}</div>
          </>
        );
      case "special":
        return (
          <>
            <div>
              <strong>
                {coursePart.name} {coursePart.exerciseCount}
              </strong>
            </div>
            <div>
              <i>{coursePart.description}</i>
            </div>
            <div>required skills: {coursePart.requirements.join(", ")}</div>
          </>
        );
      default:
        return assertNever(coursePart);
    }
  };

  return (
    <div>
      {contentByType()} <br />
    </div>
  );
};

export default Part;
