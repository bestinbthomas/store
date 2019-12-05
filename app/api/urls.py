from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('items', views.ItemView)
router.register('suppliers', views.SupplierView)
router.register('invoices', views.InvoiceView)

urlpatterns = router.urls
