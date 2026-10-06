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


DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///project.db")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = (
    False  # sql doesnt look for changes if it was true it would have looked for changes, set it true if really required otherwise it is just noise
)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
if not app.config["SECRET_KEY"]:
    raise RuntimeError(
        "SECRET_KEY environment variable is not set. "
        'Generate one with: python -c "import secrets; print(secrets.token_hex(32))" '
        "and add it to your .env / Vercel project settings."
    )
CORS(app, resources={r"/api/*": {"origins": FRONTEND_URL}}, supports_credentials=True)

# Frontend and backend are on different domains, so the session cookie needs
# SameSite=None + Secure for the browser to send it back on API requests.
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

db.init_app(
    app
)  # binds db instance to flask application after the db object is created
app.register_blueprint(main_bp)  # used to import the blueprint we made with app


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
