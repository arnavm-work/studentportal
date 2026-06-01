from flask import Flask
from flask_cors import CORS
from database.db import db
from routes.student_routes import student_routes    

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root321@localhost/student_portal'
db.init_app(app)
app.register_blueprint(student_routes)


@app.route('/')
def home():
    return "Student Portal API is running!"

if __name__ == '__main__':
    app.run(debug=True)