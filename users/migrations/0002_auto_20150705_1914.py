# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(null=True, upload_to=b'avatar/'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='account',
            field=models.CharField(unique=True, max_length=30),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.TextField(blank=True),
            preserve_default=True,
        ),
    ]
