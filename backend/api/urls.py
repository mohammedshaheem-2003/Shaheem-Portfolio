from django.urls import path
from .views import (
    APIRootView,
    ProjectListAPIView,
    ProjectDetailAPIView,
    SkillListAPIView,
    ContactMessageCreateAPIView,
)

urlpatterns = [
    path('', APIRootView.as_view(), name='api-root'),
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetailAPIView.as_view(), name='project-detail'),
    path('skills/', SkillListAPIView.as_view(), name='skill-list'),
    path('contact/', ContactMessageCreateAPIView.as_view(), name='contact-create'),
]
