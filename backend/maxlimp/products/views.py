from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *


from .orm import *
# Create your views here.

class GetProducts(APIView):
    def get(self, request):

        products = get_products()
        
        return Response(products, status=HTTP_200_OK)
    



class FuzzyProducts(APIView):
    def get(self, request):

        query = request.query_params.get("query")

        filters = request.query_params.get("filters")

        categories = filters["categories"]
        price = filters["price"]

        if not query:
            return Response([], status=HTTP_200_OK)

        products = fuzzy_search_products(query, categories, price["min"], price["max"])

        return Response(products, status=HTTP_200_OK)


class FilterProducts(APIView):
    def get(self, request):
        
        filters = request.query_params.get("filters")

        categories = filters["categories"]
        price = filters["price"]

        products = filter_products(categories, min, max)

        return Response(products, status=HTTP_200_OK)


class FilterLengthResults(APIView):
    def get(self, request):
        filters = request.query_params.get("filters")

        categories = filters["categories"]
        price = filters["price"]

        products = filter_products(categories, price["min"], price["max"])


        return Response({"length": len(products)}, status=HTTP_200_OK)



class EspecificProduct(APIView):
    def get(self, request):
        product_name = request.query_params.get("product")

        product = get_especific_product(product_name)

        return Response(product, status=HTTP_200_OK)
    

class RateProduct(APIView):
    def post(self, request):
        pass