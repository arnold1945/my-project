from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from rest_framework import status as s
from django.conf import settings
from .models import Movie, Show, Favorites
from user_app.models import Client
from .serializers import MovieDetailSerializer, MovieListSerializer, ShowDetailSerializer, ShowListSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
import requests
from rest_framework.permissions import AllowAny

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
        
        url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={settings.MOVIES_API_KEY}'
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

#for fave
class FaveMovieList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)

class FaveShowList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        shows = Show.objects.all()
        serializer = ShowListSerializer(shows, many=True)
        return Response(serializer.data)

# for lurkers
#movies
class PublicPopularMovies(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        response1 = requests.get(
            "https://api.themoviedb.org/3/movie/popular",
            params={"api_key": settings.MOVIES_API_KEY}
        )

        data = response1.json().get("results", [])

        movies = [
            {
                "id": m["id"],
                "title": m["title"],
                "year": m.get("release_date", "")[:4],
                "poster": m.get("poster_path"),
            }
            for m in data
        ]

        return Response(movies)
#shows
class PublicPopularShows(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        response1 = requests.get(
            "https://api.tvmaze.com/shows"
        )

        data = response1.json()

        shows = []
        for s in data[:20]:  
            shows.append({
                "id": s["id"],
                "title": s["name"],
                "year": (s.get("premiered") or "")[:4],
                "poster": (
                    s.get("image", {}).get("medium")
                    if s.get("image")
                    else None
                ),
            })

        return Response(shows)
    
# for public movie details
class PublicMovieDetail(APIView):
    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        url = f"https://api.themoviedb.org/3/movie/{movie_id}"
        response = requests.get(
            url,
            params={"api_key": settings.MOVIES_API_KEY}
        )

        if response.status_code != 200:
            return Response(
                {"error": "Movie not found"},
                status=response.status_code
            )

        data = response.json()

        movie = {
            "id": data["id"],
            "title": data["title"],
            "year": data.get("release_date", "")[:4],
            "overview": data.get("overview"),
            "poster": (
                f"https://image.tmdb.org/t/p/w500{data['poster_path']}"
                if data.get("poster_path")
                else None
            ),
        }

        return Response(movie, status=s.HTTP_200_OK)
    
#for public show details

class PublicShowDetail(APIView):
    permission_classes = [AllowAny]

    def get(self, request, show_id):
        url = f"https://api.tvmaze.com/shows/{show_id}"
        response = requests.get(
            url
        )

        if response.status_code != 200:
            return Response(
                {"error": "Show not found"},
                status=response.status_code
            )

        data = response.json()

        show = {
            "id": data["id"],
            "title": data["name"],
            "year": data.get("premiered", "")[:4],
            "overview": data.get("summary"),
            "poster": (
                data.get("image", {}).get("medium")
                if data.get("image")
                else None
                
            ),
        }

        return Response(show, status=s.HTTP_200_OK)

# user favorites :(
# *****
class UserFavorites(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        favorites, _ = Favorites.objects.get_or_create(
            specific_user= request.user
        )
        movies = MovieListSerializer(
            favorites.fav_movies.all(), many=True
        ).data
        
        shows = ShowListSerializer(
            favorites.fav_shows.all(), many=True
        ).data
        
        return Response({
            "movies": movies,
            "shows": shows
        })