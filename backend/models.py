# where databases tables are defined
from datetime import datetime

import sqlalchemy as sa
from extensions import db
from sqlalchemy import DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column


class Post(db.Model):
    __tablename__ = "Post"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    title: Mapped[str] = mapped_column(sa.String(200), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(sa.String(200), unique=True, nullable=False)
    content: Mapped[str] = mapped_column(db.Text, nullable=False)
    excerpt: Mapped[str] = mapped_column(sa.String(300), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        db.DateTime, default=datetime.utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )


class Admin(db.Model):
    __tablename__ = "Admin"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    username: Mapped[str] = mapped_column(sa.String(100), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(db.Text, nullable=False)
