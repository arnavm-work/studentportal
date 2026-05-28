#import mysql.connector
#
# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="root321",
#     database="student_portal")

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
