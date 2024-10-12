from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone



class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=300)  
    phone = models.CharField(max_length=30)
    avatar = models.CharField(max_length=200, default='default')
    type = models.CharField(max_length=100, default='client')

    # Override the username, first_name, last_name and date_joined fields to use email instead
    date_joined = None
    first_name = None
    last_name = None
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone', 'type', 'password']

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
