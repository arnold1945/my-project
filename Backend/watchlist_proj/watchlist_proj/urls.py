"""
URL configuration for watchlist_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from favorites_app.views import PublicPopularMovies, PublicPopularShows, PublicMovieDetail, PublicShowDetail, PublicMovieSearch, PublicShowSearch
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('user_app.urls')),
    path('favorites/', include('favorites_app.urls')),
    
    path("", lambda request: HttpResponse("API is running")),
    
    #for the lurkers
    path('movies/popular/', PublicPopularMovies.as_view()),
    path('shows/popular/', PublicPopularShows.as_view()),
    path('movies/<int:movie_id>/', PublicMovieDetail.as_view()),
    path('shows/<int:show_id>/', PublicShowDetail.as_view()),
    
    # search the 3rd party api db for movies and shows
    path("movies/search/", PublicMovieSearch.as_view()),
    path('shows/search/', PublicShowSearch.as_view()),
    

]
