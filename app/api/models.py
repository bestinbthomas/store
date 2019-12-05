from django.db import models


class Supplier(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    contact = models.CharField(max_length=15)
    GSTNo = models.CharField(max_length=16)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=100)
    articleNo = models.IntegerField(primary_key=True)
    BasePrice = models.FloatField()
    MRP = models.FloatField()
    GST = models.FloatField()
    AgreedMargin = models.IntegerField()

    def __str__(self):
        return self.name


class Invoice(models.Model):
    InvoiceNo = models.IntegerField(primary_key=True)
    Supplier = models.ForeignKey(Supplier, default=1, on_delete=models.SET_DEFAULT)
    items = models.ManyToManyField(Item)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return "Invoice No: " + str(self.InvoiceNo)
