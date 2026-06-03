export async function getStudents() {
    const response = await fetch("http://127.0.0.1:5000/api/students");
    return response.json();
   }

export async function createStudent(student) {
    const response = await fetch("http://127.0.0.1:5000/api/students", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    })
  return response.json();   
};

export async function deleteStudent(deleteId) {
    const response = await fetch(`http://127.0.0.1:5000/api/students/${deleteId}`, {
      method: "DELETE"
    });
    return response.json();
  }

export async function updateStudent(updateId, student) {
    const response = await fetch(`http://127.0.0.1:5000/api/students/${updateId}`, {
      method: "PUT",
      headers: {    
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });
    return response.json();
  }
