from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

auth = Blueprint("auth", __name__)


#############################################
# REGISTER
#############################################

@auth.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    gender = data.get("gender")
    phone = data.get("phone")
    address = data.get("address")

    if not username or not password or not email:

        return jsonify({"msg":"Missing fields"}),400

    existing_user = User.query.filter(
        (User.username==username) |
        (User.email==email)
    ).first()

    if existing_user:

        return jsonify({"msg":"User already exists"}),400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(

        username=username,
        email=email,
        password=hashed_pw,
        gender=gender,
        phone=phone,
        address=address,
        role="user"

    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg":"User Registered Successfully"})


#############################################
# LOGIN
#############################################

@auth.route("/login", methods=["POST"])
def login():

    data=request.json

    username=data.get("username")

    password=data.get("password")

    user=User.query.filter_by(username=username).first()

    if not user:

        return jsonify({"msg":"Invalid Username"}),401

    if not bcrypt.check_password_hash(user.password,password):

        return jsonify({"msg":"Invalid Password"}),401


    # access_token=create_access_token(

    #     identity={

    #         "id":user.id,
    #         "username":user.username,
    #         "role":user.role

    #     }

    # )

    access_token = create_access_token(identity=str(user.id))   # ✅ make it string

    return jsonify({

        "token":access_token,
        "user":user.to_dict()

    })

@auth.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())   # ✅ convert back to int
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg":"User not found"}),404
    return jsonify({"user": user.to_dict()})

#############################################
# UPDATE PROFILE (PHONE + ADDRESS)
#############################################

@auth.route("/update-profile", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.json

    phone = data.get("phone")
    address = data.get("address")

    if phone:
        user.phone = phone

    if address:
        user.address = address

    db.session.commit()

    return jsonify({
        "msg": "Profile updated successfully",
        "user": user.to_dict()
    })