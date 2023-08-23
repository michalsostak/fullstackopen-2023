interface ContentArrayProps {
  courseParts: ContentProps[]
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentArrayProps) => (
  <>
    {props.courseParts.map((content) => (
      <p key={content.name}>
        {content.name} {content.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
