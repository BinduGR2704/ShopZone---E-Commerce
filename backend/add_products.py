# from app import app
# from extensions import db
# from models import Product


# products = [

#     {"name":"Iphone","price":85000,"image":"iPhone.webp"},

#     {"name":"Laptop","price":65000,"image":"laptop.png"},

#     {"name":"Biscuits","price":20,"image":"biscuits.webp"},

#     {"name":"Coffee Powder","price":350,"image":"coffee.webp"},

#     {"name":"Soap","price":45,"image":"soap.jpg"},

#     {"name":"Sunscreen","price":499,"image":"sunscreen.webp"},

#     {"name":"Foundation","price":799,"image":"foundation.webp"},

#     {"name":"Hoodie","price":1200,"image":"hoodie.webp"},

#     {"name":"Dettol","price":110,"image":"dettol.jpg"},

#     {"name":"Hair Accessory","price":150,"image":"hair-accessory.webp"},

#     {"name":"Lays","price":20,"image":"lays.webp"},

#     {"name":"Bottle","price":250,"image":"bottle.jpeg"}

# ]


# with app.app_context():

#     for p in products:

#         exists = Product.query.filter_by(name=p["name"]).first()

#         if not exists:

#             item = Product(

#                 name=p["name"],
#                 price=p["price"],
#                 image=p["image"]

#             )

#             db.session.add(item)

#     db.session.commit()

#     print("Products Added Successfully ✅")

from app import app
from extensions import db
from models import Product

new_products = [
    {"name": "Cup-saucer", "price": 250, "image": "cups-saucer.jpg"},
    {"name": "Watch", "price": 2500, "image": "watches.jpg"},
    {"name": "Maggi", "price": 20, "image": "maggi.jpg"},
    {"name": "Oats", "price": 150, "image": "oats.jpg"},
    {"name": "Blanket", "price": 1200, "image": "blanket.jpg"},
    {"name": "Airpods", "price": 15000, "image": "airpods.jpg"},
    {"name": "Pens", "price": 50, "image": "pens.jpg"},
    {"name": "Bag", "price": 1800, "image": "bag.jpg"},
    {"name": "Shoes", "price": 3200, "image": "shoes.jpg"},
]

with app.app_context():
    for item in new_products:
        existing = Product.query.filter_by(name=item["name"]).first()
        if not existing:
            product = Product(
                name=item["name"],
                price=item["price"],
                image=item["image"]
            )
            db.session.add(product)
            print(f"Added: {item['name']}")
        else:
            print(f"Skipped (exists): {item['name']}")

    db.session.commit()
    print("Done!")