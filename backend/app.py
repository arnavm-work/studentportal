from flask import Flask
from flask_cors import CORS
from database.db import db
from routes.student_routes import student_routes
from models.user_model import User
from routes.auth_routes import auth_routes
from database.bcrypt import bcrypt


app = Flask(__name__)
CORS(app)
bcrypt.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root321@localhost/student_portal'
db.init_app(app)
with app.app_context():
    db.create_all()
app.register_blueprint(student_routes)
app.register_blueprint(auth_routes)

@app.route('/')
def home():
    return "Student Portal API is running!"

if __name__ == '__main__':
    app.run(debug=True)