from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as s
from .models import Movie, Show, Favorites
from user_app.models import Client
from .serializers import MovieDetailSerializer, MovieListSerializer, ShowDetailSerializer, ShowListSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class FavoritesManager(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, movie_id=None):
        if movie_id is not None:
            movie = get_object_or_404()
    