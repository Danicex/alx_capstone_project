from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Products

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'user', 'name', 'description', 'price', 'image_url', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    def create(self, validate_data):
        password = validate_data.pop('password')
        user = User.objects.create(**validate_data)
        user.set_password(password)
        user.save()
        return user
    

