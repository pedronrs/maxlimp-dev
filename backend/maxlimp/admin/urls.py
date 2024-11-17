from .views import *

from django.urls import path

urlpatterns = [
    path("add-product/", AddProduct.as_view(), name="add-product"),
    path("edit-product/", EditProduct.as_view(), name="edit-product"),
    path("delete-product/", DeleteProduct.as_view(), name="delete-product"),
    path("add-order/", AddOrder.as_view(), name="add-order"),
    path("edit-order/", EditOrderStatus.as_view(), name="edit-order"),
    path("save-image/", SaveImage.as_view(), name="save-image"),
    path("delete-image/", DeleteImage.as_view(), name="delete-image"),
    path("get-addresses/", GetAddresses.as_view(), name="get-addresses"),
]
