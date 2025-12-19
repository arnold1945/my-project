from django.db import models
from user_app.models import Client


# Create your models here.
class Movie(models.Model):
    api_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)

class Show(models.Model):
    api_id = models.IntegerField(unique=True)
    title = models.CharField(max_length= 255)

class Favorites(models.Model):
    
    specific_user = models.OneToOneField(Client, on_delete=models.CASCADE, related_name="favorites")
    fav_movies = models.ManyToManyField(Movie, blank=True)
    fav_shows = models.ManyToManyField(Show, blank=True)
