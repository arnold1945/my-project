from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from rest_framework import status as s

from .models import Movie, Show, Favorites
from user_app.models import Client
from .serializers import MovieDetailSerializer, MovieListSerializer, ShowDetailSerializer, ShowListSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
import requests

# Create your views here.

class MovieManager(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, movie_id=None):
        if movie_id is not None:
            movie = get_object_or_404(Movie, id=movie_id)
            serializer = MovieDetailSerializer(movie)
            return Response(serializer.data, status=s.HTTP_200_OK)
    ## this
    def post(self, request, movie_id=None):
        user_favorites, _ = Favorites.objects.get_or_create(specific_user = request.user) 
        
        url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY'
        response = requests.get(url)
        data = response.json()
        movie, created = Movie.objects.get_or_create(
            api_id = data['id'],
            defaults={'title': data['title']}
        )
        
        
        user_favorites.fav_movies.add(movie)
        #checkpoint *status
        return Response({'message': 'Movie added to favorites!'}, status=201)
        
    def delete(self, request, movie_id=None):
        user_favorites= Favorites.objects.get(specific_user=request.user)
        movie = get_object_or_404(Movie, id=movie_id)
        user_favorites.fav_movies.remove(movie)
        return Response({'message':'Movie removed from favorites'}, status=204)

class ShowManager(APIView):
    permission_classes= [IsAuthenticated]

    def get(self,request, show_id=None):
        if show_id is not None:
            show = get_object_or_404(Show, id=show_id)
            serializer = ShowDetailSerializer(show)
            return Response(serializer.data, status=s.HTTP_200_OK)
    def post(self, request, show_id=None):
        user_favorites, _ = Favorites.objects.get_or_create(specific_user = request.user) 
        
        url = f'https://api.tvmaze.com/shows/{show_id}'
        response= requests.get(url)
        data = response.json()
        
        show, created = Show.objects.get_or_create(
            api_id = data['id'],
            defaults={'title': data['name']}
        )
        
        
        user_favorites.fav_shows.add(show)
        return Response({'message': 'Show added to favorites!'}, status=201)
    
    def delete(self, request, show_id=None):
        user_favorites= Favorites.objects.get(specific_user=request.user)
        show = get_object_or_404(Show, id=show_id)
        user_favorites.fav_shows.remove(show)
        return Response({'message':'Show removed from favorites'}, status=204)