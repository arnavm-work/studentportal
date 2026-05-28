from models.student_model import Student
from flask import request, jsonify, Blueprint
from database.db import db

student_routes = Blueprint('student_routes', __name__)


@student_routes.route('/api/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    students_data = [student.to_dict() for student in students]
    return jsonify({
        "success":True,
        "count": len(students_data),
        "students": students_data
    })

@student_routes.route('/api/students/<int:id>', methods=['GET'])
def get_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({
            "success": False,
            "message": "Student not found"
        }), 404
    else:
        return jsonify({
            "success": True,
            "student": student.to_dict()
        })      

@student_routes.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    course = data.get('course')
    if not name or not email or not course:
        return jsonify({
            "success": False,
            "message": "Name, email, and course are required"
        }), 400
    student = Student(name=name, email=email, course=course)
    db.session.add(student)
    db.session.commit()    
    return jsonify({
        "success": True,
        "message": "Student added successfully",
        "id": id
    })

@student_routes.route('/api/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    course = data.get('course')
    student = Student.query.get(id)
    if not student:
        return jsonify({
            "success": False,
            "message": "Student not found"
        }), 404

    student.name = name
    student.email = email
    student.course = course
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Student updated successfully"
    })


@student_routes.route('/api/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({
            "success": False,
            "message": "Student not found"
        }), 404

    db.session.delete(student)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Student deleted successfully"
    })