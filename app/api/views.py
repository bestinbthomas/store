from rest_framework import viewsets
from .models import Item, Invoice, Supplier
from .serializers import ItemSerializer, SupplierSerializer, InvoiceSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



@method_decorator(csrf_exempt, name='dispatch')
class ItemView(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('articleNo')
    serializer_class = ItemSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SupplierView(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('name')
    serializer_class = SupplierSerializer

@method_decorator(csrf_exempt, name='dispatch')
class InvoiceView(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by('date').reverse()
    serializer_class = InvoiceSerializer
