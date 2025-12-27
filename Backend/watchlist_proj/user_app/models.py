from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


class Client(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    age = models.IntegerField(null=True, blank=True,validators=[MinValueValidator(18), MaxValueValidator(100)])
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return f'{self.user.email} Profile'
    