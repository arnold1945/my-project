from django.urls import path
from .views import MovieManager, ShowManager, FaveMovieList, FaveShowList, UserFavorites

urlpatterns = [
    # path('shows/<int:show_id>/', PublicShowDetail.as_view()),
    # user favorites
    path("", UserFavorites.as_view()),

    # Movies
    
    path('movies/', FaveMovieList.as_view()),
    #for logged in users
    path('movies/<int:movie_id>/', MovieManager.as_view(), name='movie-detail'),
    path('movies/<int:movie_id>/add/', MovieManager.as_view(), name='movie-add'),
    path('movies/<int:movie_id>/remove/', MovieManager.as_view(), name='movie-remove'),

    # Shows
    path('shows/', FaveShowList.as_view()),
    path('shows/<int:show_id>/', ShowManager.as_view(), name='show-detail'),
    path('shows/<int:show_id>/add/', ShowManager.as_view(), name='show-add'),
    path('shows/<int:show_id>/remove/', ShowManager.as_view(), name='show-remove'),
]
