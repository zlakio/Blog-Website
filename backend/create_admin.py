import bcrypt
from app import app
from extensions import db
from models import Admin

with app.app_context():
    admin = Admin()
    admin.username = "Zlakio"
    password = "FlaskApp@123456"
    byte = password.encode("utf-8")
    salt = bcrypt.gensalt()
    admin.password_hash = bcrypt.hashpw(byte, salt)
    db.session.add(admin)
    db.session.commit()
