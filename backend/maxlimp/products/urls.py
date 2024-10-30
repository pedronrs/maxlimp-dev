from django.urls import path

from .views import GetProducts
urlpatterns = [
    path("all-products/", GetProducts.as_view(), name="get_products"),
]
