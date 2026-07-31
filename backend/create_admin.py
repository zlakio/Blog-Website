import os

import bcrypt
from app import app
from dotenv import load_dotenv
from extensions import db
from models import Admin

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
app.config["ADMIN_PASSWORD"] = ADMIN_PASSWORD

with app.app_context():
    admin = Admin()
    admin.username = "Zlakio"
    password = ADMIN_PASSWORD
    byte = password.encode("utf-8")
    salt = bcrypt.gensalt()
    admin.password_hash = bcrypt.hashpw(byte, salt)
    db.session.add(admin)
    db.session.commit()
