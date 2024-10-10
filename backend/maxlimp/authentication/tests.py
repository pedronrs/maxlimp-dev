from django.test import TestCase
from django.db import models
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User

class UserModelTest(TestCase):
    def setUp(self):
        self.user_data = {
            'name': 'João Silva',
            'email': 'joao@example.com',
            'password': 'senha123',
            'phone': '11987654321',
            'avatar': 'https://example.com/avatar.jpg',
            'type': 'client'
        }
        self.user = User.objects.create(**self.user_data)

    def test_user_creation(self):
        self.assertTrue(isinstance(self.user, User))
        self.assertEqual(User.objects.count(), 1)

    def test_user_fields(self):
        for field, value in self.user_data.items():
            self.assertEqual(getattr(self.user, field), value)

    def test_auto_timestamps(self):
        self.assertIsNotNone(self.user.created_at)
        self.assertIsNotNone(self.user.updated_at)

    def test_field_types(self):
        field_types = {
            'id': models.AutoField,
            'created_at': models.DateTimeField,
            'updated_at': models.DateTimeField,
            'name': models.CharField,
            'email': models.CharField,
            'password': models.CharField,
            'phone': models.CharField,
            'avatar': models.CharField,
            'type': models.CharField,
        }
        for field, field_type in field_types.items():
            self.assertTrue(isinstance(User._meta.get_field(field), field_type))

    def test_field_max_lengths(self):
        max_lengths = {
            'name': 200,
            'email': 200,
            'password': 200,
            'phone': 200,
            'avatar': 200,
            'type': 100,
        }
        for field, max_length in max_lengths.items():
            self.assertEqual(User._meta.get_field(field).max_length, max_length)

    def test_unique_email(self):
        with self.assertRaises(Exception):
            User.objects.create(
                name='João Santos',
                email='joao@example.com',  
                password='outrasenha',
                phone='11976543210',
                type='admin'
            )



class LoginAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse('login')
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword123',
            name='Test User',
            phone='1234567890',
            type='client'
        )

    def test_login_successful(self):
        data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['email'], 'test@example.com')

    def test_login_invalid_credentials(self):
        data = {
            'email': 'test@example.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)

    def test_login_missing_fields(self):
        data = {'email': 'test@example.com'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_login_invalid_email(self):
        data = {
            'email': 'invalidemail',
            'password': 'testpassword123'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)