from django.contrib.auth.hashers import make_password,check_password

from .models import *
from .execptions import *




def get_avatar(email):
    user = User.objects.get(email=email)

    if user.avatar == "default":
        return False
    
    return user.avatar


def save_avatar(email, url:str):
    user = User.objects.get(email=email)
    user.avatar = url 

    user.save()

def get_user(email):
    return User.objects.filter(email=email).first()

def reset_avatar(user):
    user = User.objects.get(email=user)

    user.avatar = "default"

    user.save()


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



def update_user(email, phone, name):
    user = get_user(email)

    user.phone = phone
    user.name = name   

    user.save()


def save_address(district, address, complement, user):
    user_addresses = Address.objects.filter(user=user)
    
    for user_address in user_addresses:
        if user_address.address == address:
            return "Endereço já cadastrado"
        

    if len(user_addresses) >= 15:
        return "Limite de endereços atingido"
    
    try:
        address = Address.objects.create(
            user=user,
            district=district,
            address=address,
            complement=complement
        )

        address.save()
        return False
    except:
        return "Error durante a criação do endereço"


def remove_address(id, user):
    try:
        address = Address.objects.filter(id=id, user=user).first()

        address.delete()

    except:
        pass


def get_addresses(user):
    addresses = Address.objects.filter(user=user)

    return [{
        "id": adress.id,
        "address": adress.address,
        "complement": adress.complement,
        "district": adress.district
    } for adress in addresses ]