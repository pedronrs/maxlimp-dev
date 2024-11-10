from django.urls import path

from .views import *
urlpatterns = [
    path("all-products/", GetProducts.as_view(), name="get_products"),
    path("fuzzy-products/", FuzzyProducts.as_view(), name="fuzzy_products"),
    path("filter-products/", FilterProducts.as_view(), name="filter-products"),
    path("filter-results/", FilterLengthResults.as_view(), name="filter-results"),
    path("especific-product/", EspecificProduct.as_view(), name="especific-product"),
    path("post-comment/", RateProduct.as_view(), name="post-comment")
]
