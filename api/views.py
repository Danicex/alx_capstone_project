from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from  rest_framework.permissions  import IsAuthenticated, AllowAny
from  .permissions import IsOwner
from  rest_framework import viewsets, status, views, filters, generics
from .models import Products
from  .serializers import ProductSerializer, UserSerializer
from rest_framework.decorators import action
# Create your views here.

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'protected route'})
    
class ProductList(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    filter_search = [filters.SearchFilter]
    search_fields = ['name']
    permission_classes = [AllowAny]


    def get_queryset(self):
        # Ensure users can only see their own products
        return Products.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate the logged-in user with the product
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['delete'], permission_classes=[IsOwner])

    def delete(self, request, pk=None):
        product = self.get_object()
        product.delete()
        return Response({"message": "Product deleted successfully"})

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

   
   

