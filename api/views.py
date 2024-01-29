from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Set, Card
from .serializers import SetSerializer, CardSerializer 
from django.shortcuts import get_object_or_404                                        

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/sets/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of sets'
        },
        {
            'Endpoint': '/sets/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single set object'
        },
        {
            'Endpoint': '/sets/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new set with data sent in post request'
        },
        {
            'Endpoint': '/sets/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing set with data sent in post request'
        },
        {
            'Endpoint': '/sets/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an existing set'
        },
        {
            'Endpoint': '/sets/id/cards/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of cards'
        },
        {
            'Endpoint': '/sets/id/cards/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single card object'
        },
        {
            'Endpoint': '/sets/id/cards/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new card with data sent in post request'
        },
        {
            'Endpoint': '/sets/id/cards/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing card with data sent in post request'
        },
        {
            'Endpoint': '/sets/id/cards/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an existing card'
        },
    ]

    return Response(routes)

@api_view(['GET'])
def getSets(request):
    sets = Set.objects.all()
    serializer = SetSerializer(sets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSet(request, pk):
    set = Set.objects.get(id=pk)
    serializer = SetSerializer(set, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createSet(request):
    data = request.data
    print('data is ' + str(data))
    set = Set.objects.create(
        title=data
    )
    serializer = SetSerializer(set, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createCard(request, pk):
    setTest = Set.objects.get(id=pk)
    data = request.data
    card = Card.objects.create(
        front=data['front'],
        back=data['back'],
        set=setTest
    )
    serializer = CardSerializer(card, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateCard(request, pk, cpk):
    data = request.data
    card = Card.objects.get(id=cpk)
    serializer = CardSerializer(instance = card, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteCard(request, pk, cpk):
    card = Card.objects.get(id=cpk)
    card.delete()
    return Response('card was deleted!')


@api_view(['GET'])
def getCards(request, pk):
    setTest = Set.objects.get(id=pk)
    cards = Card.objects.filter(set=setTest)
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteSet(request, pk):
    set = Set.objects.get(id=pk)
    set.delete()
    return Response('set was deleted!')

@api_view(['PUT'])
def updateSet(request, pk):
    data = request.data
    set = Set.objects.get(id=pk)
    serializer = SetSerializer(instance = set, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)