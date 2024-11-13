from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *
from django.utils import timezone
from .models import Rating, Product
from authentication.models import User
import json


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
        product_id = request.query_params.get("product")

        product = get_especific_product(product_id)

        return Response(product, status=HTTP_200_OK)
    

class RateProduct(APIView):
    def post(self, request):
        try:
            rating_data = request.data.get("rating")
            user_data = request.data.get("user")
            product_id = request.data.get("product_id")
            stars = rating_data.get("stars")
            title = rating_data.get("title")
            comment = rating_data.get("comment")

            product = Product.objects.get(id=product_id)
    
            user, created = User.objects.get_or_create(
                name=user_data.get("name"),
                defaults={'first_name': user_data.get("name")}
            )
            print("User found or created:", user)

            rating = Rating.objects.create(
                product_id=product,
                user_id=user,
                stars=stars,
                title=title,
                comment=comment,
                created_at=timezone.now(),
                updated_at=timezone.now()
            )
            return Response({"message": "Comentário adicionado com sucesso!"}, status=HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({"error": "Produto não encontrado."}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error:", str(e))
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)
