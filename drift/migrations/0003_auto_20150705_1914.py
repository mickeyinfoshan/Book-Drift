# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_book_picture'),
        ('users', '0002_auto_20150705_1914'),
        ('drift', '0002_auto_20150705_1646'),
    ]

    operations = [
        migrations.CreateModel(
            name='DriftApply',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('createTime', models.DateField(auto_now_add=True)),
                ('book', models.ForeignKey(to='books.Book')),
                ('user', models.ForeignKey(to='users.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='drift',
            name='start',
            field=models.DateField(auto_now_add=True),
            preserve_default=True,
        ),
    ]
