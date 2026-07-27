# where your API endpoints will live
import bcrypt
import sqlalchemy as sa
from extensions import db
from flask import Blueprint, jsonify, request, session
from models import Admin, Post
from slugify import slugify

main_bp = Blueprint("main", __name__, url_prefix="/api")


@main_bp.route("/posts")
def posts():
    list_of_posts = db.session.execute(sa.select(Post)).scalars().all()
    posts_data = [
        {"id": post.id, "title": post.title, "slug": post.slug, "Excerpt": post.excerpt}
        for post in list_of_posts
    ]
    return jsonify(posts_data)


@main_bp.route("/posts/<slug>")
def get_post(slug):
    post = db.session.execute(sa.select(Post).filter_by(slug=slug)).scalar()
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    else:
        post_dict = {
            "id": post.id,
            "title": post.title,
            "slug": post.slug,
            "Excerpt": post.excerpt,
            "Content": post.content,
            "Created at": post.created_at,
        }
        return jsonify(post_dict)


@main_bp.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing or invalid"}), 400
    title = data.get("title")
    slug = slugify(title)
    content = data.get("content")
    excerpt = data.get("excerpt")
    if not title or not content or not excerpt:
        return jsonify({"error": "Title, content, and excerpt are required"}), 400
    new_post = Post(title=title, content=content, excerpt=excerpt, slug=slug)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "post created successfully"}), 201


@main_bp.route("/posts/<id>", methods=["PUT"])
def update_post(id):
    data = request.get_json()
    post = db.session.execute(sa.select(Post).filter_by(id=id)).scalar()
    if not data or post is None:
        return jsonify({"error": "No such post"}), 404
    post.title = data.get("title")
    post.slug = slugify(post.title)
    post.content = data.get("content")
    post.excerpt = data.get("excerpt")
    db.session.commit()
    return jsonify({"message": "Updated successfully"}), 200


@main_bp.route("/posts/<id>", methods=["DELETE"])
def delete_post(id):
    post = db.session.execute(sa.select(Post).filter_by(id=id)).scalar()
    if post is None:
        return jsonify({"Error": "No such Post"}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({"Message": "Successfully deleted"}), 200


@main_bp.route("/auth/login", methods=["POST"])
def auth_login():
    data = request.get_json()
    username = data.get("username")
    entered_password = data.get("password")
    userBytes = entered_password.encode("utf-8")
    admin = db.session.execute(sa.select(Admin).filter_by(username=username)).scalar()
    if admin is None:
        return jsonify({"Error": "No such Admin"}), 401
    byte = (
        admin.password_hash
        if isinstance(admin.password_hash, bytes)
        else admin.password_hash.encode("utf-8")
    )
    result = bcrypt.checkpw(userBytes, byte)
    if result == False:
        return jsonify({"Error": "Wrong Password"}), 401
    session["admin"] = True
    return jsonify({"message": "Login successful"}), 200


@main_bp.route("/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Successfully logged out"})
