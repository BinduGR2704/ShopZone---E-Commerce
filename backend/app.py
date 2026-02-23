from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, bcrypt
from auth_routes import auth
from user_routes import user

from models import *
from shop_routes import shop
from admin_routes import admin


app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

jwt.init_app(app)

bcrypt.init_app(app)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(user,url_prefix="/user")
app.register_blueprint(shop, url_prefix="/shop")
app.register_blueprint(admin, url_prefix="/admin")


###################################
# CREATE DATABASE TABLES
###################################

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return "Backend Running Successfully"


if __name__ == "__main__":
    app.run(debug=True)