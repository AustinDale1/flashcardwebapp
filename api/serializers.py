from rest_framework.serializers import ModelSerializer
from .models import Set, Card

class SetSerializer(ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'

class CardSerializer(ModelSerializer): 
    class Meta:
        model = Card
        fields = '__all__'