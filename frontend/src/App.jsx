import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateCourse, setUpdateCourse] = useState("");

  console.log(students);

  function fetchStudents() {

  fetch("http://127.0.0.1:5000/api/students")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setStudents(data.students);
    });
   }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/api/students", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, course })
    })
    .then(response => response.json())
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
    fetch(`http://127.0.0.1:5000/api/students/${deleteId}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchStudents();
      setDeleteId("");
    });
  }

  const handleUpdate = (event) => {
    if (!updateId) {
      alert("Please enter a student ID to update.");
      return;
    }
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/api/students/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: updateName, 
        email: updateEmail, 
        course: updateCourse })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      fetchStudents();  
      
      setUpdateId("");
      setUpdateName("");
      setUpdateEmail("");
      setUpdateCourse("");
    });
  }

  useEffect(() => {
    fetchStudents();
  }, []);
  
   return (
    <div>
      <h1>Student Portal</h1>
      <br></br>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Course" 
        value={course} 
        onChange={(e) => setCourse(e.target.value)} 
      />
      <button type="submit">Add Student</button>
    </form>
    <hr />
    <h2>Delete Student</h2>
    <form onSubmit={handeDelete}>
      <input 
        type="text"
        placeholder="Student ID"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />
      <button type="submit">Delete Student</button>
    </form>
    <hr />
    <h2>Update Student</h2>
    <form onSubmit={handleUpdate}>
      <input 
        type="text"
        placeholder="Student ID"
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
      />
      <input 
        type="text"        placeholder="New Name"
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
      />
      <input 
        type="email"
        placeholder="New Email"
        value={updateEmail}
        onChange={(e) => setUpdateEmail(e.target.value)}
      />
      <input 
        type="text"
        placeholder="New Course"
        value={updateCourse}
        onChange={(e) => setUpdateCourse(e.target.value)}
      />
      <button type="submit">Update Student</button>
    </form>
    <hr />
    <StudentList students = {students} />
    </div>
  )
}

export default App