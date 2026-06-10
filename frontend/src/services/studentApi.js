const API_URL = "http://127.0.0.1:5000/api/students";
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export async function getStudents() {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

export async function createStudent(student) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(student)
    })
    if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
    return response.json();   
};

export async function deleteStudent(deleteId) {
    const response = await fetch(`${API_URL}/${deleteId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
    return response.json();
  }

export async function updateStudent(updateId, student) {
    const response = await fetch(`${API_URL}/${updateId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(student)
    });
    if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
    return response.json();
  }
