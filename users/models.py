#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.
class User(models.Model):
	account = models.CharField(max_length=30,unique=True)
	password = models.TextField()
	name = models.CharField(max_length=30)
	address = models.TextField(blank=True)
	createTime = models.DateField(auto_now_add=True)
	phone = models.CharField(max_length=12)
	avatar = models.ImageField(upload_to="avatar/",null=True)
	def __unicode__(self):
		return self.name