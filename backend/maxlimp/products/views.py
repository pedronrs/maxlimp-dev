from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *


from .orm import *
# Create your views here.

class GetProducts(APIView):
    def get(self, request):

        products = get_products()
        
        return Response(products, status=HTTP_200_OK)