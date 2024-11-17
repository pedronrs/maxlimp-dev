from products.models import *
from authentication.const import SUPABASE_URL
from django.core.files.storage import FileSystemStorage

from authentication.orm import *
from products.orm import get_orders

import os
from authentication.lib import supabase_client, generate_token



def add_order(user_email, address_id, total, status, products):
    order = Order.objects.create(
        user_email=user_email,
        address_id=address_id,
        total=total,
        status=status
    )

    for product in products:
        QuantityOfProducts.objects.create(
            product_id=Product.objects.filter(id=product.id).first(),
            order_id=order,
            quantity=product.quantity
        )
    return order


def edit_order_status(order_id, status):
    order = Order.objects.get(id=order_id)
    order.status = status
    order.save()
    return order


def add_product(data):
    product = Product.objects.create(
        name=data["name"],
        price=data["price"],
        description=data["description"],
        image=data["image"],
        category=data["category"],
        quantity=data["quantity"],
    )
    return product



def edit_product(data):
    product = Product.objects.get(id=data["id"])
    product.name = data["name"]
    product.price = data["price"]
    product.description = data["description"]
    product.category = data["category"]
    product.quantity = data["quantity"]
    product.image = data["image"]
    product.save()
    return product



def delete_product(data):
    product = Product.objects.get(id=data["id"])
    product.delete()
    return product



def save_product_image(image, old_product_image):
    fs = FileSystemStorage(location="admin/temp/")

    _, file_extension = os.path.splitext(image.name)

    filename = fs.save(f"{generate_token(15)}{file_extension}", image)

    filepath = fs.path(filename)


    path_on_supastorage = f"{filename}"

    try:
        with open(filepath, 'rb') as f:
            supabase_client.storage.from_("products").upload(
                path=path_on_supastorage,
                file=f,
                file_options={"content-type": image.content_type}
            )
    except Exception as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        

    url = f"{SUPABASE_URL}/storage/v1/object/public/products/{path_on_supastorage}"


    if old_product_image:
        res = supabase_client.storage.from_("products").remove(old_product_image.split("/")[-1])


    if os.path.exists(filepath):
        os.remove(filepath)


    return url


def remove_product_image(old_image):
    if old_image:
            res = supabase_client.storage.from_("products").remove(old_image.split("/")[-1])