from django.urls import path

from .views import *
urlpatterns = [
    path("all-products/", GetProducts.as_view(), name="get_products"),
    path("fuzzy-products/", FuzzyProducts.as_view(), name="fuzzy_products"),
    path("filter-products/", FilterProducts.as_view(), name="filter-products"),
    path("filter-results/", FilterLengthResults.as_view(), name="filter-results"),
    path("especific-product/", EspecificProduct.as_view(), name="especific-product"),
    path("post-comment/", RateProduct.as_view(), name="post-comment"),
    path("delete-comment/", DeleteRating.as_view(), name="delete-comment"),
    path("add-to-cart/", AddProductCart.as_view(), name="add-to-cart"),
    path("delete-cart/", DeleteProductCart.as_view(), name="delete-cart"),
    path("get-cart/", GetCart.as_view(), name="get-cart"),
    path("get-orders/", GetOrders.as_view(), name="get-orders"),
]
