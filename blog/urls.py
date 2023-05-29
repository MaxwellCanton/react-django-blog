from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

urlpatterns = [

    path('api/',  NotesView.as_view()),
    path('api/<note_id>', NoteByIdView.as_view()),
    path('api/categories/', CategoriesView.as_view()),
    path('api/movies_category/<category_id>/', NotesByCategory.as_view()),
    path('api/rates_movie/<movie_id>/', RatesByMovie.as_view()),
    path('api/rate/',  RateView.as_view()),
    path('api/watchlist/',  WatchlistView.as_view()),
    path('docs/',include_docs_urls(title="Tasks API"))

]