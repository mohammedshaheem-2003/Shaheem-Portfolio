import logging
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import serializers
from .models import Project, Skill, ContactMessage

logger = logging.getLogger(__name__)


class ProjectSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'description',
            'image_url',
            'live_link',
            'github_link',
            'tech_stack',
            'category',
            'category_display',
            'featured',
            'order',
            'created_at',
            'updated_at',
        ]


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'proficiency_level',
            'icon',
            'order',
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'subject',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return cleaned

    def validate_message(self, value):
        cleaned = value.strip()
        if len(cleaned) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return cleaned

    def create(self, validated_data):
        contact_message = super().create(validated_data)

        # Trigger simulated email notification
        try:
            subject = f"[Portfolio Contact] {contact_message.subject} from {contact_message.name}"
            body = (
                f"New contact form submission received:\n\n"
                f"Name: {contact_message.name}\n"
                f"Email: {contact_message.email}\n"
                f"Subject: {contact_message.subject}\n"
                f"Message:\n{contact_message.message}\n\n"
                f"Submitted at: {contact_message.created_at}"
            )
            recipient = getattr(settings, 'NOTIFICATION_EMAIL_RECIPIENT', 'developer@example.com')
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'portfolio@example.com')

            send_mail(
                subject=subject,
                message=body,
                from_email=from_email,
                recipient_list=[recipient],
                fail_silently=True,
            )
            logger.info(f"Notification email dispatched for contact message ID: {contact_message.id}")
        except Exception as e:
            logger.warning(f"Simulated email delivery log warning: {e}")

        return contact_message
