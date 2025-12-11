from rest_framework.serializers import ModelSerializer
from .models import Movie, Show, Favorites
from rest_framework import serializers

### MOVIES
class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id','api_id', 'title']
class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
### SHOWS
class ShowListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ['id','api_id', 'title']
class ShowDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = '__all__'
        