import os

import bcrypt
from app import app
from dotenv import load_dotenv
from extensions import db
from models import Admin

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
app.config["ADMIN_PASSWORD"] = ADMIN_PASSWORD

with app.app_context():
    existing = Admin.query.filter_by(username="Zlakio").first()
    if existing:
        db.session.delete(existing)
        db.session.commit()
    admin = Admin()
    admin.username = "Zlakio"
    password = ADMIN_PASSWORD
    byte = password.encode("utf-8")
    salt = bcrypt.gensalt()
    admin.password_hash = bcrypt.hashpw(byte, salt).decode("utf-8")
    db.session.add(admin)
    db.session.commit()
