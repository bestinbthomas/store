# Generated by Django 2.2.7 on 2019-12-05 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20191205_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]