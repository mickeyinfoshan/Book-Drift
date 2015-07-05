# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('account', models.CharField(max_length=30)),
                ('password', models.TextField()),
                ('name', models.CharField(max_length=30)),
                ('address', models.TextField()),
                ('createTime', models.DateField(auto_now_add=True)),
                ('phone', models.CharField(max_length=12)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
