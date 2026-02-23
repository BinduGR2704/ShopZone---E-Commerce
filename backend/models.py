from extensions import db
from datetime import datetime


###########################################
# USER TABLE
###########################################

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    gender = db.Column(db.String(10))

    phone = db.Column(db.String(20))

    address = db.Column(db.Text)

    role = db.Column(
        db.String(20),
        default="user"
    )


    def to_dict(self):

        return {

            "id": self.id,
            "username": self.username,
            "email": self.email,
            "gender": self.gender,
            "phone": self.phone,
            "address": self.address,
            "role": self.role

        }


###########################################
# PRODUCTS TABLE
###########################################

class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(200),
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    image = db.Column(
        db.String(255)
    )

    quantity = db.Column(db.Integer, nullable=False, default=10)


###########################################
# CART TABLE
###########################################

class Cart(db.Model):

    __tablename__ = "cart"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        default=1
    )


###########################################
# ORDERS TABLE
###########################################

class Orders(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    total_amount = db.Column(db.Float, nullable=False)

    status = db.Column(db.String(50), default="Placed")   # ✅ ADD THIS

    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # ✅ ADD THIS (useful later)

    user = db.relationship("User", backref="orders")

###########################################
# ORDER ITEMS TABLE
###########################################

class OrderItems(db.Model):

    __tablename__ = "order_items"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )