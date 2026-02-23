from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import User, Orders, Product
from flask_jwt_extended import get_jwt

admin = Blueprint("admin", __name__)

# -----------------------------------
# ADMIN CHECK DECORATOR
# -----------------------------------
def admin_required():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user or user.role != "admin":
        return None
    return user


# -----------------------------------
# GET ALL USERS
# -----------------------------------
@admin.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    if not admin_required():
        return jsonify({"msg": "Admins only"}), 403

    users = User.query.all()
    result = []
    for u in users:
        result.append(u.to_dict())
    return jsonify(result)


# -----------------------------------
# DELETE USER
# -----------------------------------
@admin.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    if not admin_required():
        return jsonify({"msg": "Admins only"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if user.role == "admin":
        return jsonify({"msg": "Cannot delete admin"}), 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"})

# @admin.route("/users/<int:user_id>", methods=["DELETE"])
# @jwt_required()
# def delete_user(user_id):

#     print("JWT IDENTITY:", get_jwt_identity())

#     user_id_from_token = int(get_jwt_identity())
#     user_from_token = User.query.get(user_id_from_token)

#     print("TOKEN USER ROLE:", user_from_token.role if user_from_token else "NO USER")

#     if not admin_required():
#         print("ADMIN CHECK FAILED")
#         return jsonify({"msg": "Admins only"}), 403

# -----------------------------------
# GET ALL ORDERS (ALL USERS)
# -----------------------------------
@admin.route("/orders", methods=["GET"])
@jwt_required()
def get_all_orders():
    if not admin_required():
        return jsonify({"msg": "Admins only"}), 403

    orders = Orders.query.all()
    result = []

    for o in orders:
        result.append({
            "order_id": o.id,
            "user_id": o.user_id,
            "total_amount": float(o.total_amount),
            "status": o.status,
            "created_at": o.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(result)


# -----------------------------------
# UPDATE ORDER STATUS
# -----------------------------------
@admin.route("/orders/<int:order_id>", methods=["PUT"])
@jwt_required()
def update_order_status(order_id):
    if not admin_required():
        return jsonify({"msg": "Admins only"}), 403

    data = request.get_json()
    new_status = data.get("status")

    order = Orders.query.get(order_id)
    if not order:
        return jsonify({"msg": "Order not found"}), 404

    order.status = new_status
    db.session.commit()

    return jsonify({"msg": "Order status updated"})


# -----------------------------------
# ADD NEW PRODUCT
# -----------------------------------
@admin.route("/products", methods=["POST"])
@jwt_required()
def add_product():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != "admin":
        return jsonify({"msg": "Access denied"}), 403

    data = request.json

    new_product = Product(
        name=data["name"],
        price=data["price"],
        image=data["image"],
        quantity=data["quantity"]
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"msg": "Product added successfully"})