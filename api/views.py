from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from  rest_framework.permissions  import IsAuthenticated, AllowAny
from  rest_framework import viewsets, status, views, filters
from .models import Products
from  .serializers import ProductSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'protected route'})
    
class ProductList(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        # Restrict to the authenticated user's products
        user = self.request.user
        return Products.objects.filter(user=user)

class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message":  "user created sucessfully",
                "user" : {
                    "username" : user.username,
                    "email": user.email
                }, 
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
