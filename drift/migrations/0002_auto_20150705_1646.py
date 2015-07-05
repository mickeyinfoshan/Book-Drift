# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('books', '0001_initial'),
        ('drift', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Drift',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start', models.DateField(auto_now=True)),
                ('end', models.DateField(null=True)),
                ('isFinished', models.BooleanField(default=False)),
                ('book', models.ForeignKey(to='books.Book')),
                ('lendTo', models.ForeignKey(to='users.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='bookborrow',
            name='book',
        ),
        migrations.RemoveField(
            model_name='bookborrow',
            name='lendTo',
        ),
        migrations.DeleteModel(
            name='BookBorrow',
        ),
    ]
