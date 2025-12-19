from rest_framework.serializers import ModelSerializer
from .models import Movie, Show, Favorites
from rest_framework import serializers

### MOVIES
class MovieListSerializer(serializers.ModelSerializer):
    media_type = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'api_id', 'title', 'media_type']
    def get_media_type(self, obj):
        return "movie"
class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
### SHOWS
class ShowListSerializer(serializers.ModelSerializer):
    media_type = serializers.SerializerMethodField()

    class Meta:
        model = Show
        fields = ['id', 'api_id', 'title', 'media_type']
    def get_media_type(self, obj):
        return "show"
    
    
class ShowDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = '__all__'

