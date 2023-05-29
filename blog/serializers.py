from unicodedata import category 
from rest_framework import serializers
from .models import Note, Category, Rate, Watchlist
from security.models import AppUser


class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = '__all__'

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['genre'] = Category.objects.get(id = data['genre']).title
        return data


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = '__all__'

    def to_representation(self, obj):
        data = super().to_representation(obj)
        
        average = 0
        rates = Rate.objects.filter(movie = data['movie'])
        rates_count = rates.count()
        for i in rates:
            average = average + i.value
        
        res = int(average) / int(rates_count)
        data['average'] = round(res, 2)

        data['user'] = AppUser.objects.get(user_id = data['user']).username
        return data


class SaveRateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rate
        fields = '__all__'

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['user'] = user_id

        return data


class WatchlistSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Watchlist
        fields = '__all__'