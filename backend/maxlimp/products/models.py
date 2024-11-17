from django.db import models

from authentication.models import User, Address

# Create your models here.

from django.conf import settings  

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.CharField(max_length=500)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=100)

class Rating(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stars = models.IntegerField(null=False)
    comment = models.CharField(max_length=1000)
    product_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)



class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=100)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    address_id = models.ForeignKey(Address, on_delete=models.DO_NOTHING)



class QuantityOfProducts(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField()
    product_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)


class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField()
    product_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)



