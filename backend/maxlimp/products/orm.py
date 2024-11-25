from .models import Product, Rating, Cart, Order, QuantityOfProducts
from fuzzywuzzy import process


def get_product_instance(product_id):
    return Product.objects.filter(pk=product_id).first()
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


def user_ordered(user_id, product_id):
    if not user_id or not product_id:
        return []
    orders = Order.objects.filter(user_id=user_id, product_id=product_id)

    orders_arr = [{"id": item.id} for item in orders]

    return orders_arr

def can_review(user_id, product_id):
    return Order.objects.filter(user_id=user_id, product_id=product_id).exists()


def get_especific_product(user_id, product_id):
    product = Product.objects.filter(pk=product_id).first()

    if not product:
        return {}
    
    ratings = Rating.objects.filter(product_id=product.pk)

    ratings_arr = [
        {
            "user": {
                "name": rating.user_id.name,
                "avatar": rating.user_id.avatar,
                "id": rating.user_id.pk
            },
            "rating": {
                "stars": rating.stars,
                "updateAt": rating.updated_at,
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
        "ratings": ratings_arr,
        "userOrdered":len(user_ordered(user_id, product_id)) > 0,
        "canReview": can_review(user_id, product_id)
    }


    return product_obj

    


def rate_product(user_id, product_id, stars, comment):
    rating = Rating.objects.create(
        user_id=user_id,
        product_id=product_id,
        stars=stars,
        comment=comment
    )


def delete_rating(user_id, product_id):
    rating = Rating.objects.filter(user_id=user_id, product_id=product_id).first()

    if rating:
        rating.delete()



def get_cart(user_id):
    cart = Cart.objects.filter(user_id=user_id.id)

    cart_arr = [
        {
        "id": item.product_id.id,
        "name": item.product_id.name,
        "price": item.product_id.price,
        "image": item.product_id.image,
        "QuantityOfProducts": item.quantity
        } for item in cart
    ]


    return cart_arr





def cart_management(user_id, product_id, quantity):
    cart = Cart.objects.filter(user_id=user_id, product_id=product_id).first()

    if cart:
        cart.quantity = quantity
        cart.save()
    else:
        Cart.objects.create(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )

    return get_cart(user_id)



def delete_cart(user_id, product_id):
    cart = Cart.objects.filter(user_id=user_id, product_id=product_id).first()

    if cart:
        cart.delete()

    return get_cart(user_id)    




def get_orders(user):
    orders = Order.objects.filter(user_id=user)


    response = []

    for order in orders:
        products_by_order = [{
            "id": product.product_id.id,
            "name": product.product_id.name,
            "price": product.product_id.price,
            "image": product.product_id.image,
            "quantity": product.quantity
        } for product in QuantityOfProducts.objects.filter(order_id=order)] 

        order_obj = {"products": products_by_order, 
                     "total": order.total, 
                     "status": order.status,
                     "createdAt": order.created_at,
                     "updatedAt": order.updated_at,
                     "address": order.address_id.address,
                     "district": order.address_id.district,
                     "complement": order.address_id.complement,
                     "id": order.id
                       }
        
        response.append(order_obj)

    return response