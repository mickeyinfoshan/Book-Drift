# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_book_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='description',
            field=models.TextField(default='', verbose_name=b'\xe7\xae\x80\xe4\xbb\x8b'),
            preserve_default=False,
        ),
    ]
