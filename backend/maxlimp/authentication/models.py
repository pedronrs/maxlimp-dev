from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)  
    phone = models.CharField(max_length=200)
    avatar = models.CharField(max_length=200)
    type = models.CharField(max_length=100)

    # Override the username, first_name, last_name and date_joined fields to use email instead
    date_joined = None
    first_name = None
    last_name = None
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone', 'type', 'password']

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
