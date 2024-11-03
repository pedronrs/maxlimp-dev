from django.db import models
from django.conf import settings  # Corrigido para usar AUTH_USER_MODEL

class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.CharField(max_length=500)  # Corrigido conforme a última verificação
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=100)

class Rating(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stars = models.IntegerField(null=False)
    title = models.CharField(max_length=500)
    comment = models.CharField(max_length=1000)
    product_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)  # Corrigido para usar AUTH_USER_MODEL
