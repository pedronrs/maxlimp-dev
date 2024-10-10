from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import LoginSerializer, UserSerializer

class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class RegisterAPI(APIView):
    pass

class LogoutAPI(APIView):
    pass

class RedefinePasswordAPI(APIView):
    pass

class DeleteAccountAPI(APIView):
    pass
