# Generated by Django 2.2.7 on 2019-12-05 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20191205_0659'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]