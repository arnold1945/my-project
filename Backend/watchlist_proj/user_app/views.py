from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as s
from .serializers import ClientSerializer
from rest_framework.authtoken.models import Token

# Create your views here.
class UserPermission(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Sign_Up(APIView):
    #create/post
    def post(self, request):
        data = request.data.copy()
        data["username"] = data.get("email")
        serializer = ClientSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"client": user.email, "token": token.key}, status=s.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=s.HTTP_400_BAD_REQUEST)
        

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = data.get("email")
        user = authenticate(
            username=data.get("username"), password=data.get("password")
        )
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "client" : user.email,
                "token" : token.key
                    }, status=s.HTTP_200_OK)
        else:
            return Response("not a user", status=s.HTTP_404_NOT_FOUND)


class Log_out(UserPermission):
    def post(self, request):
        try:
            request.user.auth_token.delete()
        
        except:
            pass
        return Response('logged out', status=s.HTTP_204_NO_CONTENT)



class Info(UserPermission):
    def get(self, request):
        user = request.user
        if user:
            
            return Response({
                "email": user.email
                
            }, status=s.HTTP_200_OK)
        else:
            return Response("not a user", status=s.HTTP_404_NOT_FOUND)
