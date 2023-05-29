from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions , viewsets
from rest_framework.authentication import SessionAuthentication
from .models import Note, Category, Rate, Watchlist
from .serializers import NoteSerializer, CategorySerializer, RateSerializer, SaveRateSerializer, WatchlistSerializer
from django.db.models import Q
from rest_framework import generics
# Create your views here.

class NotesView(generics.GenericAPIView):

    serializer_class = NoteSerializer

    def get(self, request, format=None):

        if Note.objects.all().exists():
            notes = Note.objects.all().order_by('-release_date')
            serializer = NoteSerializer(notes, many=True)
            return Response({'notes':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not notes'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None):
        movie =  request.data
        serializer = NoteSerializer(data=movie)
        if serializer.is_valid():
            movie_saved  = serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": serializer.errors})


class NoteByIdView(APIView):
    def get(self, request, note_id, format=None):
        if Note.objects.all().exists():
            note = Note.objects.get(id = note_id)
            serializer = NoteSerializer(note, many=False)
            return Response({'note':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not movies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, note_id):
        movie = get_object_or_404(Note.objects.all(), pk=note_id)
        movie.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)


    def put(self, request, note_id, format=None):
        data = request.data
        movie = Note.objects.get(id = note_id)
        serializer = NoteSerializer(instance = movie, data = data, partial = True)
        if serializer.is_valid():
            movie_saved  = serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False})

    


class CategoriesView(generics.GenericAPIView):

    serializer_class = CategorySerializer

    def get(self, request, format=None):

        if Category.objects.all().exists():
            notes = Category.objects.all()
            serializer = CategorySerializer(notes, many=True)
            return Response({'categories':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not categories'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request, format=None):
        category =  request.data
        serializer = CategorySerializer(data=category)
        if serializer.is_valid():
            category_saved  = serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": serializer.errors})


class NotesByCategory(APIView):
    def get(self, request, category_id, format=None):
        if Note.objects.all().exists():
            notes = Note.objects.filter(genre = category_id)
            serializer = NoteSerializer(notes, many=True)
            return Response({'movies_by_category':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not movies of this category'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RatesByMovie(APIView):
    def get(self, request, movie_id, format=None):
        rates = Rate.objects.filter(movie = movie_id)
        if rates.exists():
            serializer = RateSerializer(rates, many=True)
            return Response({'movie_rates':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not rates for this movie'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RateView(generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = SaveRateSerializer

    def post(self, request, format=None):
        rate =  request.data
        rate['user'] = request.user.user_id
        serializer = SaveRateSerializer(data=rate)
        if serializer.is_valid():
            rate_saved = serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False})


class WatchlistView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request, format=None):
        current_user = request.user.user_id
        movie = request.data

        validate_watchlist = Watchlist.objects.filter(Q(user_id = current_user) & Q(movie_id = movie['movie']))
        if validate_watchlist.exists():
            return Response({"success": "You already have this movie in your watchlist"}, status=status.HTTP_200_OK)

        movie['user'] = current_user
        serializer = WatchlistSerializer(data=movie)
        if serializer.is_valid():
            watchlist_saved  = serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False})

    def get(self, request, format=None):
        movies = Watchlist.objects.filter(user = request.user.user_id)
        listmovies = []
        if movies.exists():
            for movie_i in movies:
                movie = Note.objects.get(id = movie_i.movie_id)
                listmovies.append(movie)    
            serializer = NoteSerializer(listmovies, many=True)
            return Response({'movies_list':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'there are not movies in the watchlist of this user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

