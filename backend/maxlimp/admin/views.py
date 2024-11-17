from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .orm import *

# Create your views here.


class SaveImage(APIView):
    def post(self, request):
        old_image = request.data.get("oldImage")
        new_image = request.data.get("newImage")

        url = save_product_image(new_image, old_image)

        return Response({"message": "Image salva com sucesso", "image": url}, status=HTTP_200_OK)



class DeleteImage(APIView):
    def post(self, request):
        image = request.data.get("oldImage")

        remove_product_image(image)

        return Response({"message": "Imagem deletada com sucesso"}, status=HTTP_200_OK)


class AddProduct(APIView):
    def post(self, request):
        data = request.data.get("product")

        add_product(data)

        return Response({"message": "Produto adicionado com sucesso"}, status=HTTP_200_OK)



class EditProduct(APIView):
    def put(self, request):
        data = request.data.get("product")

        edit_product(data)

        return Response({"message": "Produto editado com sucesso"}, status=HTTP_200_OK)


class DeleteProduct(APIView):
    def post(self, request):
        data = request.data.get("product")

        delete_product(data)

        return Response({"message": "Produto deletado com sucesso"}, status=HTTP_200_OK)


class AddOrder(APIView):
    def post(self, request):
        data = request.data.get("order")

        add_order(data.user)

        return Response({"message": "Pedido adicionado com sucesso"}, status=HTTP_200_OK)


class EditOrderStatus(APIView):
    def put(self, request):
        
        data = request.data.get("order")


        edit_order_status(data["id"], data["status"])

        return Response({"message": "Status do pedido editado com sucesso"}, status=HTTP_200_OK)





class GetAddresses(APIView):
    def get(self, request):

        email = request.query_params.get("email")

        user = user_exists(email)
        
        if not user:
            return Response({"error": "Usuário não encontrado"}, status=HTTP_400_BAD_REQUEST)
        

        addresses = get_addresses(user)

        if not addresses:
            return Response({"error": "Endereços não encontrados"}, status=HTTP_400_BAD_REQUEST)
        
        return Response({"addresses": addresses}, status=HTTP_200_OK)



class GetOrders(APIView):
    def get(self, request):

        email = request.query_params.get("email")

        user = user_exists(email)

        if not user:
            return Response({"error": "Usuário não encontrado"}, status=HTTP_400_BAD_REQUEST)
        

        orders = get_orders(user)

        if not orders:
            return Response({"error": "Pedidos não encontrados"}, status=HTTP_400_BAD_REQUEST)
        
        return Response({"orders": orders}, status=HTTP_200_OK)



