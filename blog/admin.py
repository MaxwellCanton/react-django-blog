from django.contrib import admin

# Register your models here.


from .models import Note, Category, Rate, Watchlist

admin.site.register(Note)
admin.site.register(Category)
admin.site.register(Rate)
admin.site.register(Watchlist)