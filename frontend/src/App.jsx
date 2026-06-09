import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import { getStudents, createStudent, deleteStudent, updateStudent } from "./services/studentApi";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase()) ||
    student.course.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete student with ID ${id}?`);
    if (!confirmDelete) {
      return;
    }
    deleteStudent(id)
    .then(data => {
      fetchStudents();
      });  
  };
 

  const handleAddRow = () => {
    createStudent({
      name: "New Student",
      email: "example@example.com",
      course: "example course"
    })
    .then(data => {
      fetchStudents();
    })
    .catch(error => {
      console.error("Error creating student:", error);
    });
  }

  const fetchStudents = () => {
    getStudents()
      .then(data => {
        setStudents(data.students);
      });
  };
  
  const handleSave = (student) => {
    updateStudent(student.id, {
      name: student.name,
      email: student.email,
      course: student.course
    })
    .then(() => {
      fetchStudents();
      setEditingId(null);
    });
  }

  console.log(students);
  
  useEffect(() => {
    fetchStudents();
  }, []);
  
   return (
    <div className="app-container">
      <nav className="navbar">
        <h2>Student Portal</h2>
      </nav>
      <header className="header">
        <h2>Student Management Dashboard</h2>
        <p>Manage student information</p>
      </header>
    
      <section className="actions-card">
        <h3>Quick Actions:</h3>

        <div className="action-bar">
          <button onClick={handleAddRow}>Add Student</button>
          <input 
            type="text"
            placeholder="Search students..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
      </section>

      <section className="students-card">
        <StudentList 
          students={filteredStudents} 
          handleDelete={handleDelete} 
          editingId={editingId} 
          setEditingId={setEditingId} 
          handleSave={handleSave} 
        />
      </section>
    </div>

  )
}

export default App
