from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Project, Skill, ContactMessage
from .serializers import ProjectSerializer, SkillSerializer, ContactMessageSerializer


class ProjectListAPIView(generics.ListAPIView):
    """
    GET /api/projects/
    Supports query parameters:
    - ?featured=true/false
    - ?tech=react (searches within tech_stack JSON)
    - ?category=fullstack/frontend/backend/cloud_ai
    - ?search=keywords (searches title and description)
    """
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()

        featured_param = self.request.query_params.get('featured')
        if featured_param is not None:
            is_featured = featured_param.lower() in ['true', '1', 'yes']
            queryset = queryset.filter(featured=is_featured)

        category_param = self.request.query_params.get('category')
        if category_param and category_param.lower() != 'all':
            queryset = queryset.filter(category__iexact=category_param)

        tech_param = self.request.query_params.get('tech')
        if tech_param:
            # Match case-insensitively against JSON array or string representation
            queryset = queryset.filter(tech_stack__icontains=tech_param)

        search_param = self.request.query_params.get('search')
        if search_param:
            queryset = queryset.filter(
                Q(title__icontains=search_param) |
                Q(description__icontains=search_param)
            )

        return queryset


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/projects/<slug>/
    Retrieves detailed info for a single project by slug.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class SkillListAPIView(generics.ListAPIView):
    """
    GET /api/skills/
    Supports query parameter:
    - ?category=frontend/backend/devops/tools
    """
    serializer_class = SkillSerializer

    def get_queryset(self):
        queryset = Skill.objects.all()
        category_param = self.request.query_params.get('category')
        if category_param:
            queryset = queryset.filter(category__iexact=category_param)
        return queryset


class ContactMessageCreateAPIView(generics.CreateAPIView):
    """
    POST /api/contact/
    Receives contact form submissions, validates data, persists to database,
    and dispatches simulated notification email.
    """
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "success": True,
                "message": "Thank you! Your message has been received and I'll be in touch soon.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class APIRootView(APIView):
    """
    API Health check and available endpoint directory
    """
    def get(self, request):
        return Response({
            "status": "online",
            "message": "Developer Portfolio REST API is running",
            "endpoints": {
                "projects": request.build_absolute_uri('/api/projects/'),
                "skills": request.build_absolute_uri('/api/skills/'),
                "contact": request.build_absolute_uri('/api/contact/'),
            }
        })
