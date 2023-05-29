from django.db import models
from django.utils import timezone
import uuid
from security.models import AppUser


class Category(models.Model):

    title = title = models.CharField(max_length=255)
    objects = models.Manager()

    def __str__(self):
        return self.title


class Note(models.Model):

    title = models.CharField(max_length=255)
    release_date = models.DateField()
    plot = models.TextField()
    genre = models.ForeignKey(Category, on_delete=models.PROTECT)

    objects = models.Manager()

    class Meta:
        ordering = ('-release_date',)

    def __str__(self):
        return self.title


class Rate(models.Model):

    value = models.IntegerField()
    user = models.ForeignKey(AppUser, on_delete=models.PROTECT)
    movie = models.ForeignKey(Note, on_delete=models.CASCADE)
    review = models.TextField()
    value = models.IntegerField(default  = 0)

    objects = models.Manager()

    def __str__(self):
        return "rate-" + str(self.value) + "-movie-" + str(self.movie)


class Watchlist(models.Model):
    
    movie = models.ForeignKey(Note, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.PROTECT)

    objects = models.Manager()

    def __str__(self):
        return "movie-" + str(self.movie.title) + "-user-" + str(self.user.email)


