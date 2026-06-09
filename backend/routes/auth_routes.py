from flask import Blueprint, request, jsonify
from models.user_model import User
from database.db import db
from database.bcrypt import bcrypt

auth_routes = Blueprint('auth_routes', __name__)


@auth_routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({
            "success": False,
            "message": "Username, email, and password are required"
        }), 400
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({
            "success": False,
            "message": "Username or email already exists"
        }), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password_hash=hashed_password)
    db.session.add(user)
    db.session.commit()    
    return jsonify({
        "success": True,
        "message": "User registered successfully",
        "id": user.id
    }), 201

@auth_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401
    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": user.to_dict()
    }), 200