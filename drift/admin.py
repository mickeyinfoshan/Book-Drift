#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.contrib import admin
from drift.models import Drift,DriftApply
# Register your models here.
admin.site.register(Drift)
admin.site.register(DriftApply)
admin.site.site_header = '漂流书吧后台管理'