#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models
from users.models import User
from books.models import Book
# Create your models here.

class Drift(models.Model):
	book = models.ForeignKey(Book)
	lendTo = models.ForeignKey(User)
	start = models.DateField(auto_now_add=True)
	end = models.DateField(auto_now=False,null=True)
	isFinished = models.BooleanField(default=False)

class DriftApply(models.Model):
	book = models.ForeignKey(Book)
	user = models.ForeignKey(User)
	createTime = models.DateField(auto_now_add=True)