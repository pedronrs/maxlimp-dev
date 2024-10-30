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

        print(query)
        if not query:
            return Response([], status=HTTP_200_OK)

        products = fuzzy_search_products(query)

        return Response(products, status=HTTP_200_OK)