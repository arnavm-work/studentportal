import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import { getStudents, createStudent, deleteStudent, updateStudent } from "./services/studentApi";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase()) ||
    student.course.toLowerCase().includes(searchText.toLowerCase())
  );

  const performDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete student with ID ${id}?`);
    if (!confirmDelete) {
      return;
    }
    deleteStudent(id)
    .then(data => {
      console.log(data);
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
    });
  }

  function fetchStudents() {
  getStudents()
    .then(data => {;
      setStudents(data.students);
    });
   }

  const handleSubmit = (event) => {
    event.preventDefault();
    createStudent({
      name,
      email,
      course
    })

    .then(data => {
      console.log(data);
      fetchStudents();
      setName("");
      setEmail("");
      setCourse("");
    });
  }
  
  const handeDelete = (event) => {
    if (!deleteId) {
      alert("Please enter a student ID to delete.");
      return;
    }
    event.preventDefault();
    performDelete(deleteId);
      setDeleteId("");
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
          performDelete={performDelete} 
          editingId={editingId} 
          setEditingId={setEditingId} 
          handleSave={handleSave} 
        />
      </section>
    </div>

  )
}

export default App
