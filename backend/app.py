# entry point where flask starts
import os

from dotenv import load_dotenv
from extensions import db
from flask import Flask, redirect, render_template, request, session
from flask_cors import CORS
from routes import main_bp

app = Flask(__name__)
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")
app.config["FRONTEND_URL"] = FRONTEND_URL

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///project.db"  # use SQLite (the /// means local file, not a remote server) and database file will be called project.db
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = (
    False  # sql doesnt look for changes if it was true it would have looked for changes, set it true if really required otherwise it is just noise
)
app.config["SECRET_KEY"] = "x7k2p9m4q1w8"
CORS(app, resources={r"/api/*": {"origins": FRONTEND_URL}})

db.init_app(
    app
)  # binds db instance to flask application after the db object is created
app.register_blueprint(main_bp)  # used to import the blueprint we made with app


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # creates the tables within the application context
    app.run(debug=True)
