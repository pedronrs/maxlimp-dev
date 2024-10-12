from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import login

from .lib import *
from .orm import *


class RegisterAPI(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        phone = request.data.get('phone')
        name = request.data.get('name')

        validation_errors = validate_register_fields(email, password, phone, name)

        if validation_errors:
            #Erros de validação
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        

        #Está pronto para criar o usuário
        try:
            user = create_user(email, password, phone, name)
        except UserAlreadyExistsError as e:
            #Usuário já existe
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ORMError as e:
            # Problema na camada de orm
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

        #Gerando token
        token = create_jwt(user)

        # Realizar o login do usuário
        login(request, user)

        #Gerando resposta com token
        response = create_response_with_token("Usuário registrado com sucesso.", status.HTTP_201_CREATED, token)

        return response



class LoginAPI(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

class LogoutAPI(APIView):
    pass

class RedefinePasswordAPI(APIView):
    pass

class DeleteAccountAPI(APIView):
    pass
