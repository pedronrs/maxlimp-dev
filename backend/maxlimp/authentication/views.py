from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import check_password

from .lib import *
from .orm import *


class ResendEmailCodeAPI(APIView):
    def post(self, request):
        for key, value in request.COOKIES.items():
            print(f"{key}: {decode_jwt(value)}")
        auth = request.COOKIES.get("auth")

        if auth is not None:
            if decode_jwt(auth).get("invalid") is None: 
                return Response({"error": "O usuário já está autenticado.", "type": "alreadyAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)

        temp_auth = request.COOKIES.get("temp_auth")

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid"): 
                return Response({"error": "O usuário não está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
        

        payload = decode_jwt(temp_auth)

        email = payload['email']
        phone = payload['phone']
        password = payload['password']
        name = payload['name']

        email_code = send_random_code(email)

        response = create_jwt_response("Código reenviado com sucesso.", status.HTTP_200_OK, create_jwt_temp(name, email, password, phone, email_code), "temp_auth")

        return response

class EmailCodeAPI(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
        
        if auth is not None:
            if decode_jwt(auth).get("invalid") is None: 
                return Response({"error": "O usuário já está autenticado.", "type": "alreadyAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)

        temp_auth = request.COOKIES.get("temp_auth")

        if temp_auth is None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário não está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        

        code = request.data.get("code")

        payload = decode_jwt(temp_auth)

        email = payload['email']
        password = payload['password']
        phone = payload['phone']
        name = payload['name']
        correct_code = payload['correct_code']

        if not code:
            return Response({"error": "Código inválido.", "type": "invalidCode"}, status=status.HTTP_400_BAD_REQUEST)

        if code != correct_code:
            return Response({"error": "Código inválido.", "type": "invalidCode"},
                            status=status.HTTP_400_BAD_REQUEST)
        

        try:    
            user = create_user(email, password, phone, name)
        except ORMError as e:
            return Response({"error": str(e), "type": "ormError"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except UserAlreadyExistsError as e:
            return Response({"error": str(e), "type": "userAlreadyExists"}, status=status.HTTP_400_BAD_REQUEST)


        response = create_jwt_response("Usuário criado com sucesso.", status.HTTP_200_OK, create_jwt_to_auth(user))

        set_cookie(response, "temp_auth", invalid_cookie())

        return response




class RegisterAPI(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")
      
        if auth is not None:
            if decode_jwt(auth).get("invalid") is None: 
                print("DANDO ERRO1")
                return Response({"error": "O usuário já está autenticado.", "type": "alreadyAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
        
        temp_auth = request.COOKIES.get("temp_auth")


 
        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                print("DANDO ERRO2")
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
            

        email = request.data.get("email")
        password = request.data.get("password")
        phone = request.data.get("phone")  
        name = request.data.get("name")

        validation_errors = validate_register_fields(email, password, phone, name)   


        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        

        if user_exists(email):
            return Response({"error": "Já existe um usuário com este email.", "type": "userAlreadyExists"},
                            status=status.HTTP_400_BAD_REQUEST)
        

        email_code = send_random_code(email)

        response = create_jwt_response("Código enviado com sucesso.", status.HTTP_200_OK, create_jwt_temp(name, email, password, phone, email_code), "temp_auth")


        return response

class LoginAPI(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")

        if auth is not None:
            if decode_jwt(auth).get("invalid") is None: 
                return Response({"error": "O usuário já está autenticado.", "type": "alreadyAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
        
        temp_auth = request.COOKIES.get("temp_auth")

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data.get("email")
        password = request.data.get("password")
        
        validation_errors = validate_login_fields(email, password)

        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        

        messages = check_login_credentials(email, password)

        if messages["errorOcurred"]:
            return Response(messages, status=status.HTTP_400_BAD_REQUEST)
        

        response = create_jwt_response(messages["message"], status.HTTP_200_OK, create_jwt_to_auth(messages["user"]))


        return response

class LogoutAPI(APIView):
    def post(self, request):
        auth = request.COOKIES.get("auth")

        if auth is not None:
            if decode_jwt(auth).get("invalid"): 
                return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                            status=status.HTTP_400_BAD_REQUEST)
        
        temp_auth = request.COOKIES.get("temp_auth")

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)

        
        response = create_jwt_response("Usuário deslogado com sucesso.", status.HTTP_200_OK, invalid_cookie())

        return response

class RedefinePasswordAPI(APIView):
    def patch(self, request):
        auth = request.COOKIES.get("auth")

        if auth is not None:
            if decode_jwt(auth).get("invalid"): 
                return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                            status=status.HTTP_400_BAD_REQUEST)
        
        temp_auth = request.COOKIES.get("temp_auth")

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)


        user = get_user(decode_jwt(auth)["email"])
        email = user.email
        password = request.data.get("password")
        new_password = request.data.get("newPassword")

        validation_errors = validate_redefine_password_fields(password, new_password)

        print(password, user.password)

        if not check_password(password, user.password):
            return Response({"error": "A senha atual está errada."}, status=status.HTTP_400_BAD_REQUEST)

        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            redefine_password(email, new_password)
        except ORMError as e:
            return Response({"error": str(e), "type": "ormError"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except UserNotExistsError as e:
            return Response({"error": str(e), "type": "userNotExists"}, status=status.HTTP_400_BAD_REQUEST)
    

        return Response({"message": "Senha redefinida com sucesso."}, status=status.HTTP_200_OK)
        


class DeleteAccountAPI(APIView):
    def delete(self, request):
        auth = request.COOKIES.get("auth")
        temp_auth = request.COOKIES.get("temp_auth")

        print(auth, temp_auth)

        if auth is not None:
            if decode_jwt(auth).get("invalid"): 
                return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                            status=status.HTTP_400_BAD_REQUEST)
        
      

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
               
            

        user = get_user(decode_jwt(auth)["email"])

        email = user.email

        try:
            delete_user(email)
        except ORMError as e:
            return Response({"error": str(e), "type": "ormError"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except UserNotExistsError as e:
            return Response({"error": str(e), "type": "userNotExists"}, status=status.HTTP_400_BAD_REQUEST)
        

        response = create_jwt_response("Conta destruída.", status.HTTP_200_OK, invalid_cookie())
        
        return response
    
       

class UpdateAccountAPI(APIView):
    def put(self, request):
        auth = request.COOKIES.get("auth")
        temp_auth = request.COOKIES.get("temp_auth")

        print(auth, temp_auth)

        if auth is not None:
            if decode_jwt(auth).get("invalid"): 
                return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"},
                            status=status.HTTP_400_BAD_REQUEST)
        
      

        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_400_BAD_REQUEST)
            
        email = decode_jwt(auth)["email"]
               

        name = request.data.get("name")
        phone = str(request.data.get("phone"))

        validation_errors = validate_register_fields("email@gmail.com", "0000000000", phone, name)

        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)

        
        update_user(email, phone, name)
       
        
        return Response({"message": "Informações atualizadas."}, status=status.HTTP_200_OK)
    



class CheckAuthAPI(APIView):
    def get(self, request):

        temp_auth = request.COOKIES.get("temp_auth")
        auth = request.COOKIES.get("auth")

     

       
        if temp_auth is not None:
            if decode_jwt(temp_auth).get("invalid") is None: 
                return Response({"error": "O usuário está no processo de autenticação.", "type": "authenticating"},
                                status=status.HTTP_200_OK)

        if auth is not None:
            if decode_jwt(auth).get("invalid"): 
                return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "O usuário não está autenticado.", "type": "notAuthenticated"}, status=status.HTTP_200_OK)

          
           
        user = get_user(decode_jwt(auth)["email"])

        if user is None:
            return Response({"error": "O usuário não existe.", "type": "notAuthenticated"}, status=status.HTTP_200_OK)

        user_obj = {
            "name":user.name,
            "email": user.email,
            "avatar": user.avatar,
            "phone": user.phone,
        }

        return Response({"message": "Usuário autenticado com sucesso.", "user": user_obj, "type": "authenticated"}, status=status.HTTP_200_OK)