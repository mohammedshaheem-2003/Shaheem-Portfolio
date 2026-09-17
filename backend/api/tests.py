from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Project, Skill, ContactMessage


class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.project1 = Project.objects.create(
            title="Project Alpha",
            description="Alpha description",
            tech_stack=["React", "Django"],
            category="fullstack",
            featured=True,
            order=1
        )
        self.project2 = Project.objects.create(
            title="Project Beta",
            description="Beta description",
            tech_stack=["Vue", "FastAPI"],
            category="frontend",
            featured=False,
            order=2
        )

        self.skill = Skill.objects.create(
            name="React",
            category="frontend",
            proficiency_level=90,
            icon="Code"
        )

    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("projects", response.data["endpoints"])

    def test_project_list(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_project_filter_featured(self):
        url = reverse('project-list')
        response = self.client.get(url, {'featured': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Project Alpha")

    def test_project_filter_category(self):
        url = reverse('project-list')
        response = self.client.get(url, {'category': 'frontend'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Project Beta")

    def test_skill_list(self):
        url = reverse('skill-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "React")

    def test_contact_submission_success(self):
        url = reverse('contact-create')
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Collaboration inquiry",
            "message": "Hello, I would love to discuss an exciting project with you!"
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])
        self.assertTrue(ContactMessage.objects.filter(email="jane@example.com").exists())

    def test_contact_submission_invalid(self):
        url = reverse('contact-create')
        payload = {
            "name": "J",
            "email": "not-an-email",
            "subject": "Hi",
            "message": "Short"
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
