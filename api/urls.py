from rest_framework.routers import DefaultRouter
from .views import ProductList

router = DefaultRouter()
router.register(r'products', ProductList, basename='product')

urlpatterns = router.urls
