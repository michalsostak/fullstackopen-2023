const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        return s + p.exercises
    }, 0);

    return (
        <b>Total of {total} exercises</b>
    )
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(prt =>
            <Part part={prt} key={prt.id} />
        )}
    </>


const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course