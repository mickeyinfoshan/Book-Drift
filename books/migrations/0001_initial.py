# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe4\xb9\xa6\xe5\x90\x8d')),
                ('author', models.CharField(max_length=30, verbose_name=b'\xe4\xbd\x9c\xe8\x80\x85')),
                ('kind', models.CharField(max_length=20, verbose_name=b'\xe7\xb1\xbb\xe5\x9e\x8b')),
                ('createTime', models.DateField(auto_now_add=True)),
                ('currentOwner', models.ForeignKey(related_name='currentOwner', to='users.User')),
                ('originOwner', models.ForeignKey(related_name='originOwner', to='users.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField()),
                ('mark', models.IntegerField()),
                ('book', models.ForeignKey(to='books.Book')),
                ('user', models.ForeignKey(to='users.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('book', models.ForeignKey(to='books.Book')),
                ('user', models.ForeignKey(to='users.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
