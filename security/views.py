from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import generics

UserModel = get_user_model()

class UserRegister(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    serializer_class = UserRegisterSerializer

    def post(self, request):
        request.data['username'] = request.data['email']
        clean_data = request.data
        email = request.data['email'].strip()
        username = request.data['username'].strip()
        password = request.data['password'].strip()
        if not email or UserModel.objects.filter(email=email).exists():
            return Response({"data":"choose another email"}, status=status.HTTP_400_BAD_REQUEST)
            
        if not password or len(password) < 8:
            return Response({"data":"choose another password, min 8 characters"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response({"data":"success"}, status=status.HTTP_201_CREATED)
        return Response({"data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class UserLogin(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    
    serializer_class = UserLoginSerializer

    def post(self, request):
        data = request.data
        email = data['email'].strip()
        if not email:
            return Response({"data":"please give a email"}, status=status.HTTP_400_BAD_REQUEST)

        password = data['password'].strip()
        if not password:
            return Response({"data":"please give a password"}, status=status.HTTP_400_BAD_REQUEST)
            
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
        return Response({"data":"success"}, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response({"data":"success"}, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    serializer_class = UserSerializer


    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class CheckUserAuthenticated(APIView):

    def post(self,request):
        if request.user.is_authenticated:
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status=status.HTTP_200_OK)
