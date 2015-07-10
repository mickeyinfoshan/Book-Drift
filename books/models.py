#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models
from users.models import User

# Create your models here.
class Book(models.Model):
	name = models.CharField("书名",max_length=50)
	author = models.CharField("作者",max_length=30)
	kind = models.CharField("类型",max_length=20)
	picture = models.ImageField(upload_to="books/",null=True)
	originOwner = models.ForeignKey(User,related_name='originOwner')
	currentOwner = models.ForeignKey(User, related_name='currentOwner')
	createTime = models.DateField(auto_now_add=True)
	description = models.TextField("简介")
	def __unicode__(self):
		return self.name + u"（" + self.author + u"）"

class Comment(models.Model):
	user = models.ForeignKey(User)
	content = models.TextField()
	mark = models.IntegerField()
	book = models.ForeignKey(Book)

class Like(models.Model):
	user = models.ForeignKey(User)
	book = models.ForeignKey(Book)