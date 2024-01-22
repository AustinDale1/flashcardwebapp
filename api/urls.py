from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('sets/', views.getSets, name='sets'),
    path('sets/<str:pk>/cards/', views.getCards, name='cards'),
    path('sets/<str:pk>/cards/create', views.createCard, name='createCard'),
    path('sets/<str:pk>/cards/<str:cpk>/delete', views.deleteCard, name='deleteCard'),
    path('sets/<str:pk>/cards/<str:cpk>/update', views.updateCard, name='updateCard'),
    path('sets/create', views.createSet, name='createSet'),
    path('sets/<str:pk>/delete', views.deleteSet, name='deleteSet'),
    path('sets/<str:pk>/update', views.updateSet, name='updateSet'),
    path('sets/<str:pk>', views.Set, name='set'),
]