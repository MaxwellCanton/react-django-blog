from django.db import models
from django.utils import timezone
import uuid
# Create your models here.


class Post(models.Model):

    object_id =  models.UUIDField(default = uuid.uuid4, unique=True)
    title = models.CharField(max_length=255)
    created = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    slug = models.SlugField(unique=True)

    objects = models.Manager()

    def __str__(self):
        return self.title