from django.contrib.auth.hashers import make_password,check_password

from .models import *
from .execptions import *


def get_user(email):
    return User.objects.filter(email=email).first()


def user_exists(email):
    return User.objects.filter(email=email).exists()

def create_user(email, password, phone, name):
    if user_exists(email):
        raise UserAlreadyExistsError("Já existe um usuário com este email.")
    try:    
        user = User.objects.create(
            email=email, 
            password=make_password(password), 
            phone=phone, 
            name=name)
    except Exception as e:
        raise ORMError(f"Erro ao criar usuário: {str(e)}")
    return user


def check_login_credentials(email, password):
    messages = {}
    user = User.objects.filter(email=email).first()
    #Verificando se o usuário existe
    if user is None:
        messages["errorOcurred"] = True
        messages["error"] = "O usuário não existe."
        messages["type"] = "notExists"
    #Verificando a senha do usuário
    elif not check_password(password, user.password):
        messages["errorOcurred"] = True
        messages["error"] = "A senha está errado."
        messages["type"] = "wrongPassword"
    else:
        messages["errorOcurred"] = False
    
    #Verificando se ocorreu um erro
    if not messages["errorOcurred"]:
        messages["user"] = user
        messages["message"] = "Usuário logado com sucesso"

    return messages


def redefine_password(email, password):
    user = User.objects.filter(email=email).first()
    if user is None:
        raise UserNotExistsError("Usuário não existe.")
    try:
        user.password = make_password(password)
        user.save()
    except Exception as e:
        raise ORMError(f"Erro ao redefinir senha: {str(e)}")
    return user


def delete_user(email):
    user = User.objects.filter(email=email).first()
    if user is None:
        raise UserNotExistsError("Usuário não existe.")
    try:
        user.delete()
    except Exception as e:
        raise ORMError(f"Erro ao deletar usuário: {str(e)}")
    return user