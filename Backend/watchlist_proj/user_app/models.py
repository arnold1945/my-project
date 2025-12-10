from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Client(AbstractUser):
    
    name = models.CharField(null=False)
    email = models.EmailField(null=False, unique=True)
    USERNAME_FIELD = 'email'
    password = models.CharField(null=False)
    #??
    REQUIRED_FIELDS = [] 
    