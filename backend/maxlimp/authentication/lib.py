from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.conf import settings

from rest_framework.response import Response

from datetime import datetime, timedelta

import jwt
import re

from .const import *

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
    elif not re.match(r'^\d{10,15}$', phone):
        errors['error'] = 'Número de telefone inválido.'
        errors['type'] = 'phoneInvalid'

    if not name:
        errors['error'] = 'Nome é obrigatório.'
        errors['type'] = 'nameNeeded'
    elif len(name) < MIN_NAME_LENGTH:
        errors['error'] = 'O nome deve ter pelo menos 2 caracteres.'
        errors['type'] = 'nameInvalid'

    return errors


def create_jwt(user):
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


def create_response_with_token(message, status, token):
    response = Response({"message": message}, status=status)
    # Coloca o cookie com data de expiração de 120 dias
    response.set_cookie(
        key='jwt', 
        value=token, 
        httponly=True,
        secure=True,
        samesite='Strict',
        max_age=MAX_AGE_JWT
        )
    
    return response

