from rest_framework import serializers

from .models import Item, Supplier, Invoice


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ("url", "name", "articleNo", "BasePrice", "MRP", "GST", "AgreedMargin")


class SupplierSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Supplier
        fields = ("url", "name", "contact", "GSTNo")


class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invoice
        fields = ("url", "InvoiceNo", "Supplier", "items", "date")
