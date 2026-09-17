from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_home_view(request):
    return JsonResponse({
        "name": "Full-Stack Developer Portfolio API",
        "version": "1.0.0",
        "documentation": "Visit /api/ for endpoint listings or /admin/ for management portal",
        "api_endpoints": {
            "api_root": "/api/",
            "projects": "/api/projects/",
            "skills": "/api/skills/",
            "contact": "/api/contact/",
        }
    })

urlpatterns = [
    path('', root_home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
