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

        products = fuzzy_search_products(query, 50, categories, price["min"], price["max"])

        return Response(products, status=HTTP_200_OK)


class FilterProducts(APIView):
    def get(self, request):
        
        filters = request.query_params.get("filters")

        categories = filters["categories"]
        price = filters["price"]

        products = filter_products(categories, min, max)

        return Response(products, status=HTTP_200_OK)


class FilterLengthResults(APIView):
    filters = request.query_params.get("filters")

    categories = filters["categories"]
    price = filters["price"]

    products = filter_products(categories, min, max)


    return Response({"length": len(products)}, status=HTTP_200_OK)