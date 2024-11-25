from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *
from django.utils import timezone
from .models import Rating, Product
from authentication.models import User
import json

from authentication.lib import decode_jwt
from authentication.orm import get_user


from .orm import *
# Create your views here.

class GetProducts(APIView):
    def get(self, request):

        products = get_products()
        
        return Response(products, status=HTTP_200_OK)
    



class FuzzyProducts(APIView):
    def get(self, request):

        query = request.query_params.get("query")

        filters = json.loads(request.query_params.get("filters"))

        categories = filters.get("categories")
        price = filters.get("price")

        if not query:
            return Response([], status=HTTP_200_OK)

        products = fuzzy_search_products(query, categories, price["min"], price["max"])

        return Response(products, status=HTTP_200_OK)


class FilterProducts(APIView):
    def post(self, request):

        categories = request.data.get("categories")
        price = request.data.get("price")

        print(categories, price)

        products = filter_products(categories, price["min"], price["max"])


        return Response(products, status=HTTP_200_OK)


class FilterLengthResults(APIView):
    def get(self, request):
        filters = json.loads(request.query_params.get("filters"))

        categories = filters["categories"]
        price = filters["price"]

        products = filter_products(categories, price["min"], price["max"])


        return Response({"length": len(products)}, status=HTTP_200_OK)



class EspecificProduct(APIView):
    def get(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            user = None


        product_id = request.query_params.get("product")

        product = get_especific_product(user, product_id)


        return Response(product, status=HTTP_200_OK)
    

class RateProduct(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response({"error": "Usuário não autenticado."}, status=HTTP_401_UNAUTHORIZED)
    
        
        product_id = request.data.get("id")
        stars = request.data.get("stars")
        comment = request.data.get("comment")

        product = get_product_instance(product_id)

        rate_product(user, product, stars, comment)


        return Response({"message": "Produto avaliado com sucesso!"}, status=HTTP_201_CREATED)
    


class DeleteRating(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response({"error": "Usuário não autenticado."}, status=HTTP_401_UNAUTHORIZED)
        
        

        product_id = request.data.get("id")

        product = get_product_instance(product_id)

        delete_rating(user, product)


        return Response({"message": "Avaliação removida com sucesso!"}, status=HTTP_200_OK)
            



class AddProductCart(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response({"error": "Usuário não autenticado."}, status=HTTP_401_UNAUTHORIZED)
        
        product = request.data.get("product")

        cart_management(user, 
                        get_product_instance(product.get("id")), 
                        product.get("quantity"))
        
        return Response({"message": "Produto adicionado ao carrinho com sucesso!"}, status=HTTP_201_CREATED)



class DeleteProductCart(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response({"error": "Usuário não autenticado."}, status=HTTP_401_UNAUTHORIZED)
        
        product = request.data.get("product")

        delete_cart(user, 
                    get_product_instance(product.get("id")))
        
        return Response({"message": "Produto removido do carrinho com sucesso!"}, status=HTTP_200_OK)


class GetCart(APIView):
    def get(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response([])
        
        cart = get_cart(user)

        return Response(cart, status=HTTP_200_OK)
    


class GetOrders(APIView):
    def get(self, request):
        auth = request.COOKIES.get("auth")
        try:
            user = get_user(decode_jwt(auth)["email"])
        except:
            return Response({"error": "Usuário não autenticado."}, status=HTTP_401_UNAUTHORIZED)
        
        orders = get_orders(user)

        print(orders)

        return Response(orders, status=HTTP_200_OK)