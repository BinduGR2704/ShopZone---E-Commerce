from flask import Blueprint,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity

from models import User

user = Blueprint("user",__name__)


###################################
# GET USER PROFILE
###################################

@user.route("/profile",methods=["GET"])
@jwt_required()

def profile():

    current_user=get_jwt_identity()

    user=User.query.get(current_user["id"])

    if not user:

        return jsonify({"msg":"User not found"}),404


    return jsonify(user.to_dict())