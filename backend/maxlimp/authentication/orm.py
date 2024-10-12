from .models import *
from .execptions import *

from django.contrib.auth.hashers import make_password

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


