from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='login'),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("code/", EmailCodeAPI.as_view(), name="email-code"),
    path("recode/", ResendEmailCodeAPI.as_view(), name="re-email-code"),
    path("logout/", LogoutAPI.as_view(), name="logout"),
    path("redefine-password/", RedefinePasswordAPI.as_view(), name="redefine-password"),
    path("forgot-password/", ForgotPasswordAPI.as_view(), name="forgot-password"),
    path("check-auth/", CheckAuthAPI.as_view(), name="check-auth"),
]
