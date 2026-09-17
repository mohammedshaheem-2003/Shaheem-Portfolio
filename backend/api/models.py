from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('fullstack', 'Full-Stack'),
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('cloud_ai', 'Cloud & AI'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="Direct URL to project screenshot or thumbnail"
    )
    live_link = models.URLField(max_length=500, blank=True, null=True)
    github_link = models.URLField(max_length=500, blank=True, null=True)
    tech_stack = models.JSONField(
        default=list,
        blank=True,
        help_text="List of technologies, e.g. ['React', 'Django', 'Tailwind', 'PostgreSQL']"
    )
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default='fullstack'
    )
    featured = models.BooleanField(
        default=False,
        help_text="Highlight on hero or featured showcases"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display priority (lower numbers appear first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('devops', 'DevOps & Cloud'),
        ('tools', 'Tools & Workflow'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    proficiency_level = models.PositiveIntegerField(
        default=85,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Proficiency percentage between 1 and 100"
    )
    icon = models.CharField(
        max_length=60,
        blank=True,
        help_text="Lucide React icon name (e.g. 'Code', 'Database', 'Server', 'Cloud')"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-proficiency_level', 'name']
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'

    def __str__(self):
        return f"{self.name} ({self.get_category_display()} - {self.proficiency_level}%)"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"Message from {self.name} <{self.email}>: {self.subject[:40]}"
