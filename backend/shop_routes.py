# from flask import Blueprint, request, jsonify

# from flask_jwt_extended import (
#     jwt_required,
#     get_jwt_identity
# )

# from extensions import db

# from models import (
#     Product,
#     Cart,
#     Order,
#     OrderItem
# )


# #########################################
# # BLUEPRINT
# #########################################

# shop = Blueprint("shop", __name__)


# #########################################
# # GET ALL PRODUCTS
# #########################################

# from flask import Blueprint, jsonify
# from models import Product

# shop = Blueprint("shop", __name__)


# ####################################
# # GET PRODUCTS
# ####################################

# @shop.route("/products", methods=["GET"])
# def get_products():

#     try:

#         products = Product.query.all()

#         result = []

#         for p in products:

#             result.append({

#                 "id": p.id,
#                 "name": p.name,
#                 "price": p.price,
#                 "image": p.image

#             })

#         return jsonify(result)

#     except Exception as e:

#         print("ERROR:", e)

#         return jsonify({"msg":"error"}),500


# #########################################
# # ADD TO CART
# #########################################

# @shop.route("/cart/add", methods=["POST"])
# @jwt_required()
# def add_cart():

#     user_id = get_jwt_identity()

#     data = request.json

#     product_id = data.get("product_id")

#     if not product_id:

#         return jsonify({"msg": "Product id required"}), 400


#     cart = Cart.query.filter_by(

#         user_id=user_id,
#         product_id=product_id

#     ).first()

#     if cart:

#         cart.quantity += 1

#     else:

#         cart = Cart(

#             user_id=user_id,
#             product_id=product_id,
#             quantity=1

#         )

#         db.session.add(cart)

#     db.session.commit()

#     return jsonify({"msg": "Item Added To Cart"})


# #########################################
# # UPDATE QUANTITY (+ or -)
# #########################################

# @shop.route("/cart/update", methods=["POST"])
# @jwt_required()
# def update_cart():

#     user_id = get_jwt_identity()

#     data = request.json

#     product_id = data.get("product_id")

#     quantity = data.get("quantity")

#     cart = Cart.query.filter_by(

#         user_id=user_id,
#         product_id=product_id

#     ).first()

#     if not cart:

#         return jsonify({"msg": "Cart not found"}), 404


#     # remove if qty zero
#     if quantity <= 0:

#         db.session.delete(cart)

#     else:

#         cart.quantity = quantity

#     db.session.commit()

#     return jsonify({"msg": "Cart Updated"})


# #########################################
# # GET USER CART ITEMS
# #########################################

# @shop.route("/cart", methods=["GET"])
# @jwt_required()
# def get_cart():

#     user_id = get_jwt_identity()

#     carts = Cart.query.filter_by(

#         user_id=user_id

#     ).all()

#     result = []

#     total = 0

#     for c in carts:

#         product = Product.query.get(

#             c.product_id

#         )

#         subtotal = product.price * c.quantity

#         total += subtotal

#         result.append({

#             "product_id": product.id,
#             "name": product.name,
#             "price": float(product.price),
#             "quantity": c.quantity,
#             "image": product.image,
#             "subtotal": float(subtotal)

#         })

#     return jsonify({

#         "items": result,
#         "total": float(total)

#     })


# #########################################
# # PLACE ORDER
# #########################################

# @shop.route("/order/place", methods=["POST"])
# @jwt_required()
# def place_order():

#     user_id = get_jwt_identity()

#     carts = Cart.query.filter_by(

#         user_id=user_id

#     ).all()

#     if not carts:

#         return jsonify({"msg": "Cart Empty"}), 400


#     total_amount = 0

#     for c in carts:

#         product = Product.query.get(

#             c.product_id

#         )

#         total_amount += product.price * c.quantity


#     order = Order(

#         user_id=user_id,
#         total_amount=total_amount

#     )

#     db.session.add(order)

#     db.session.commit()


#     # add order items

#     for c in carts:

#         product = Product.query.get(

#             c.product_id

#         )

#         item = OrderItem(

#             order_id=order.id,
#             product_id=c.product_id,
#             quantity=c.quantity,
#             price=product.price

#         )

#         db.session.add(item)


#     # clear cart

#     Cart.query.filter_by(

#         user_id=user_id

#     ).delete()

#     db.session.commit()

#     return jsonify({

#         "msg": "Order Placed Successfully",
#         "order_id": order.id

#     })

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models import Product, Cart, Orders, OrderItems

shop = Blueprint("shop", __name__)


# ----------------------------
# GET ALL PRODUCTS
# ----------------------------
# @shop.route("/products", methods=["GET"])
# def get_products():
#     products = Product.query.all()
#     result = []
#     for p in products:
#         result.append({
#             "id": p.id,
#             "name": p.name,
#             "price": float(p.price),
#             "image": p.image
#         })
#     return jsonify(result), 200

from flask import request

@shop.route("/products", methods=["GET"])
def get_products():

    search = request.args.get("search")

    if search:
        products = Product.query.filter(
            Product.name.ilike(f"%{search}%")
        ).all()
    else:
        products = Product.query.all()

    result = []

    for p in products:
        result.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image
        })

    return jsonify(result)

# ----------------------------
# ADD TO CART
# ----------------------------
# @shop.route("/cart/add", methods=["POST"])
# @jwt_required()
# def add_to_cart():
#     user_id = int(get_jwt_identity())
#     data = request.get_json()

#     product_id = data.get("product_id")
#     if not product_id:
#         return jsonify({"msg": "product_id required"}), 400

#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"msg": "Product not found"}), 404

#     item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
#     if item:
#         item.quantity += 1
#     else:
#         item = Cart(user_id=user_id, product_id=product_id, quantity=1)
#         db.session.add(item)

#     db.session.commit()
#     return jsonify({"msg": "Added to cart"}), 200

@shop.route("/cart/add", methods=["POST"])
@jwt_required()
def add_to_cart():

    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    product = Product.query.get(product_id)

    if not product:
        return jsonify({"msg": "Product not found"}), 404

    if quantity > product.quantity:
        return jsonify({
            "msg": f"Only {product.quantity} items available in stock"
        }), 400

    # Check if already in cart
    existing = Cart.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing:
        if existing.quantity + quantity > product.quantity:
            return jsonify({
                "msg": f"Only {product.quantity} items available"
            }), 400

        existing.quantity += quantity
    else:
        new_item = Cart(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )
        db.session.add(new_item)

    db.session.commit()

    return jsonify({"msg": "Added to cart"})

# ----------------------------
# VIEW CART (with total)
# ----------------------------
@shop.route("/cart", methods=["GET"])
@jwt_required()
def view_cart():
    user_id = int(get_jwt_identity())

    cart_items = Cart.query.filter_by(user_id=user_id).all()
    items = []
    total = 0.0

    for c in cart_items:
        p = Product.query.get(c.product_id)
        if not p:
            continue

        subtotal = float(p.price) * int(c.quantity)
        total += subtotal

        items.append({
            "product_id": p.id,
            "name": p.name,
            "price": float(p.price),
            "image": p.image,
            "quantity": int(c.quantity),
            "subtotal": float(subtotal)
        })

    return jsonify({"items": items, "total": float(total)}), 200


# ----------------------------
# UPDATE QUANTITY
# ----------------------------
@shop.route("/cart/update", methods=["POST"])
@jwt_required()
def update_cart_qty():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if product_id is None or quantity is None:
        return jsonify({"msg": "product_id and quantity required"}), 400

    item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if not item:
        return jsonify({"msg": "Item not found in cart"}), 404

    quantity = int(quantity)
    if quantity <= 0:
        db.session.delete(item)
    else:
        item.quantity = quantity

    db.session.commit()
    return jsonify({"msg": "Cart updated"}), 200


# ----------------------------
# REMOVE ITEM FROM CART
# ----------------------------
@shop.route("/cart/remove", methods=["POST"])
@jwt_required()
def remove_cart_item():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    product_id = data.get("product_id")
    if not product_id:
        return jsonify({"msg": "product_id required"}), 400

    item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if not item:
        return jsonify({"msg": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Removed"}), 200


# ----------------------------
# PLACE ORDER (save in DB)
# ----------------------------
# @shop.route("/order/place", methods=["POST"])
# @jwt_required()
# def place_order():
#     user_id = int(get_jwt_identity())

#     cart_items = Cart.query.filter_by(user_id=user_id).all()
#     if not cart_items:
#         return jsonify({"msg": "Cart is empty"}), 400

#     total = 0.0
#     for c in cart_items:
#         p = Product.query.get(c.product_id)
#         if p:
#             total += float(p.price) * int(c.quantity)

#     order = Orders(user_id=user_id, total_amount=float(total), status="Placed")
#     db.session.add(order)
#     db.session.commit()  # to get order.id

#     for c in cart_items:
#         p = Product.query.get(c.product_id)
#         if not p:
#             continue

#         oi = OrderItems(
#             order_id=order.id,
#             product_id=p.id,
#             quantity=int(c.quantity),
#             price=float(p.price)
#         )
#         db.session.add(oi)

#     # clear cart
#     Cart.query.filter_by(user_id=user_id).delete()
#     db.session.commit()

#     return jsonify({"msg": "Order placed successfully", "order_id": order.id}), 200

@shop.route("/order/place", methods=["POST"])
@jwt_required()
def place_order():

    user_id = int(get_jwt_identity())

    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"msg": "Cart is empty"}), 400

    total = 0.0

    # 🔥 STEP 1: CHECK STOCK AVAILABILITY
    for c in cart_items:
        p = Product.query.get(c.product_id)

        if not p:
            return jsonify({"msg": "Product not found"}), 404

        if int(c.quantity) > p.quantity:
            return jsonify({
                "msg": f"{p.name} has only {p.quantity} items available"
            }), 400

        total += float(p.price) * int(c.quantity)

    # 🔥 STEP 2: CREATE ORDER
    order = Orders(user_id=user_id, total_amount=float(total), status="Placed")
    db.session.add(order)
    db.session.commit()  # to get order.id

    # 🔥 STEP 3: CREATE ORDER ITEMS + DEDUCT STOCK
    for c in cart_items:
        p = Product.query.get(c.product_id)

        # Deduct stock
        p.quantity -= int(c.quantity)

        oi = OrderItems(
            order_id=order.id,
            product_id=p.id,
            quantity=int(c.quantity),
            price=float(p.price)
        )

        db.session.add(oi)

    # 🔥 STEP 4: CLEAR CART
    Cart.query.filter_by(user_id=user_id).delete()

    db.session.commit()

    return jsonify({
        "msg": "Order placed successfully",
        "order_id": order.id
    }), 200

# ----------------------------
# ORDER HISTORY (list orders)
# ----------------------------
@shop.route("/orders", methods=["GET"])
@jwt_required()
def order_history():
    user_id = int(get_jwt_identity())

    orders = Orders.query.filter_by(user_id=user_id).order_by(Orders.id.desc()).all()
    result = []

    for o in orders:
        result.append({
            "order_id": o.id,
            "total_amount": float(o.total_amount),
            "status": o.status,
            "created_at": o.created_at.strftime("%Y-%m-%d %H:%M:%S") if o.created_at else ""
        })

    return jsonify({"orders": result}), 200


# ----------------------------
# ORDER DETAILS (items of one order)
# ----------------------------
@shop.route("/orders/<int:order_id>", methods=["GET"])
@jwt_required()
def order_details(order_id):
    user_id = int(get_jwt_identity())

    order = Orders.query.filter_by(id=order_id, user_id=user_id).first()
    if not order:
        return jsonify({"msg": "Order not found"}), 404

    items = OrderItems.query.filter_by(order_id=order_id).all()
    result_items = []

    for it in items:
        p = Product.query.get(it.product_id)
        result_items.append({
            "product_id": it.product_id,
            "name": p.name if p else "Unknown",
            "image": p.image if p else "",
            "price": float(it.price),
            "quantity": int(it.quantity),
            "subtotal": float(it.price) * int(it.quantity)
        })

    return jsonify({
        "order": {
            "order_id": order.id,
            "total_amount": float(order.total_amount),
            "status": order.status,
            "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S") if order.created_at else ""
        },
        "items": result_items
    }), 200