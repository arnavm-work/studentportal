function Studentlist({ students }) {
    return (
        <div>
            <h1>Student List</h1>
            {students.map(student => (
                <div key={student.id}>
                    <h2>{student.id}: {student.name}</h2>
                </div>
            ))}
        </div>
    );
}
export default Studentlist;