from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.conf import settings
from django.core.mail import send_mail
from django.core.files.storage import FileSystemStorage

import os
import secrets
import string



from rest_framework.response import Response

from datetime import datetime, timedelta

from random import randint

import jwt
import re

from .orm import *

from .const import *

from .models import *

from supabase import create_client

supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)



def validate_redefine_password_fields(password, new_password):
    errors = {}

    if not new_password:
        errors['error'] = 'Nova senha é obrigatória.'
        errors['type'] = 'newPasswordNeeded'
    elif len(new_password) < MIN_PASSWORD_LENGTH:
        errors['error'] = 'A nova senha deve ter pelo menos 8 caracteres.'
        errors['type'] = 'newPasswordInvalid'

    if new_password == password:
        errors['error'] = 'A nova senha não pode ser igual a senha antiga.'
        errors['type'] = 'newPasswordEqualPassword'

    return errors

def validate_login_fields(email, password):
    errors = {}

    
    if not email:
        errors['error'] = 'Email é obrigatório.'
        errors['type'] = 'emailNeeded'
    else:
        try:
            validate_email(email)
        except ValidationError:
            errors['error'] = 'Email inválido.'
            errors['type'] = 'emailInvalid'
   
    if not password:
        errors['error'] = 'Senha é obrigatória.'
        errors['type'] = 'passwordNeeded'
    elif len(password) < MIN_PASSWORD_LENGTH:
        errors['error'] = 'A senha deve ter pelo menos 8 caracteres.'
        errors['type'] = 'passwordInvalid'


    return errors


def validate_register_fields(email, password, phone, name):
    errors = {}

    
    if not email:
        errors['error'] = 'Email é obrigatório.'
        errors['type'] = 'emailNeeded'
    else:
        try:
            validate_email(email)
        except ValidationError:
            errors['error'] = 'Email inválido.'
            errors['type'] = 'emailInvalid'
   
    if not password:
        errors['error'] = 'Senha é obrigatória.'
        errors['type'] = 'passwordNeeded'
    elif len(password) < MIN_PASSWORD_LENGTH:
        errors['error'] = 'A senha deve ter pelo menos 8 caracteres.'
        errors['type'] = 'passwordInvalid'

    if phone == None:
        errors['error'] = 'Número de telefone é obrigatório.'
        errors['type'] = 'phoneNeeded'
    elif not re.match(r'^\d{9,16}$', phone):
        errors['error'] = 'Número de telefone inválido.'
        errors['type'] = 'phoneInvalid'

    if not name:
        errors['error'] = 'Nome é obrigatório.'
        errors['type'] = 'nameNeeded'
    elif len(name) < MIN_NAME_LENGTH:
        errors['error'] = 'O nome deve ter pelo menos 2 caracteres.'
        errors['type'] = 'nameInvalid'

    return errors

def set_cookie(response, key, value):
    response.set_cookie(
        key=key,
        value=value,
        httponly=True,  
        samesite='None',
        secure=True,
        max_age=MAX_AGE_JWT,
        path='/',
    )

    return response


def create_jwt_response(message, status, payload, key="auth"):
    response = Response({"message": message, "payload": payload}, status=status)

    response.set_cookie(
        key=key,
        value=payload,
        httponly=True,  
        samesite='None',
        secure=True,
        max_age=MAX_AGE_JWT,
        path='/',
    )

    return response


def decode_jwt(token):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])


def create_jwt_temp(name, email, password, phone, code):
    #Criando payload
    payload = {
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'correct_code': code,
        'expiration_date': (datetime.now() + timedelta(minutes=20)).timestamp(),  
        'exp': datetime.now() + timedelta(days=120),
        'iat': datetime.now(),
    }

    #Gerando token
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)
    return token

def invalid_cookie():
    #Criando payload
    j = {
        'invalid': True,
        'exp': datetime.now() + timedelta(days=120),
        'iat': datetime.now(),
    }

    payload = jwt.encode(j, settings.SECRET_KEY, algorithm=ALGORITHM)

    
    return payload

def create_jwt_to_auth(user):
    #Criando payload
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.now() + timedelta(days=120),
        'iat': datetime.now(),
    }
    
    #Gerando token
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)
    return token


def send_random_code(email):
    # Gerar código aleatório de 6 dígitos
    code = str(randint(100000, 999999))

    subject = "Seu código de verificação"
    body = f"Seu código de verificação é: {code}"

    # Enviar email usando Django
    try:
        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER,
            [email],
            auth_password=settings.EMAIL_HOST_PASSWORD,
            fail_silently=False,
        )
    except Exception as e:
        print("ERROR", e)
        return False

    return code


def resset_password_email(email):
    token = jwt.encode({'email': email, 'exp': datetime.now() + timedelta(minutes=30)}, settings.SECRET_KEY, algorithm=ALGORITHM)

    UserToken.objects.create(user=email, token=token)

    subject = "Redefinição de senha"
    body = f"Para redefinir sua senha, clique no link a seguir: <a href='http://localhost:5173/reset-password/{token}'>Clique aqui!</a>"
    try:
        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER,
            [email],
            auth_password=settings.EMAIL_HOST_PASSWORD,
            fail_silently=False,
        )
    except Exception as e:
        print("ERROR", e)
        return False
    
    return token


def generate_token(length=10):
    alphabet = string.ascii_letters + string.digits  
    token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return token



def send_avatar(image, email):
    fs = FileSystemStorage(location="authentication/temp/")

    _, file_extension = os.path.splitext(image.name)

    filename = fs.save(f"{generate_token(15)}{file_extension}", image)

    filepath = fs.path(filename)


    path_on_supastorage = f"{filename}"

    try:
        with open(filepath, 'rb') as f:
            supabase_client.storage.from_("avatars").upload(
                path=path_on_supastorage,
                file=f,
                file_options={"content-type": image.content_type}
            )
    except Exception as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        

    url = f"{SUPABASE_URL}/storage/v1/object/public/avatars/{path_on_supastorage}"

    old_avatar = get_avatar(email)

    if old_avatar:
        res = supabase_client.storage.from_("avatars").remove(old_avatar.split("/")[-1])


    if os.path.exists(filepath):
        os.remove(filepath)


    save_avatar(email, url)

    return url


def remove_avatar(old_avatar):
    if old_avatar:
            res = supabase_client.storage.from_("avatars").remove(old_avatar.split("/")[-1])