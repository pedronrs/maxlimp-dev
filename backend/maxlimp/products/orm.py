from .models import Product, Rating
from fuzzywuzzy import process




def get_products():
    products = Product.objects.all()


    products_list = []

    for product in products:
        products_list.append({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image": product.image,
            "category": product.category,
        })


    return products_list


def filter_products(categories, min, max):
    products = get_products()

    if len(categories):
        products = [product for product in products if product["category"] in categories]

    if min and max:
        products = [product for product in products if product["price"] < max and product["price"] > min]

    return products




def fuzzy_search_products(query, categories, min, max, threshold=50):
    products = filter_products(categories, min, max)
    
    product_names = [product["name"] for product in products]

    matches = process.extract(query, product_names, limit=len(product_names))


    matched_products = [
        product for product in products
        for name, score in matches if name == product["name"] and score >= threshold
    ]

    return matched_products


def get_especific_product(product_id):
    product = Product.objects.filter(pk=product_id).first()

    if not product:
        return {}
    
    ratings = Rating.objects.filter(product_id=product.pk)

    ratings_arr = [
        {
            "user": {
                "name": rating.user_id.name,
                "avatar": rating.user_id.avatar
            },
            "rating": {
                "stars": rating.stars,
                "updateAt": rating.updated_at,
                "title": rating.title,
                "comment": rating.comment
            }
        } for rating in ratings
    ]

    product_obj = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "price": product.price,
        "ratings": ratings_arr
    }


    return product_obj

    




