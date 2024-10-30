from .models import Product
from fuzzywuzzy import process


def get_products():
    products = Product.objects.all()


    products_list = []

    for product in products:
        products_list.append({
            "name": product.name,
            "price": product.price,
            "image": product.image,
            "category": product.category,
        })


    return products_list


def fuzzy_search_products(query, threshold=50):
    products = get_products()

    
    product_names = [product["name"] for product in products]

    matches = process.extract(query, product_names, limit=len(product_names))


    matched_products = [
        product for product in products
        for name, score in matches if name == product["name"] and score >= threshold
    ]

    return matched_products




""" senha supabase FXisN4m0HJ7vwcKe
url https://vmorglmppqgytzksajfe.supabase.co
senha rls eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtb3JnbG1wcHFneXR6a3NhamZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNjg2OTQsImV4cCI6MjA0NTc0NDY5NH0.i3R-Mp4sqXwSF7HG_1emxsFwzDpcaeY8ykYco-KkY58
 """