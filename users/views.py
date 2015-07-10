from django.shortcuts import render
from users.models import User
import hashlib

from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

#users/

# register/
@csrf_exempt
def addUser(request):
	password = hashlib.sha256(request.POST['password']).hexdigest()
	user = User(account=request.POST['account'],password=password)
	user.name = request.POST['name']
	user.phone = request.POST['phone']
	user.address = request.POST['address']
	if 'avatar' in request.FILES:
		user.avatar = request.FILES['avatar']
	user.save()
	return HttpResponse(200)

# (?P<userId>\d+)/update/
@csrf_exempt
def updateUser(request,userId):
	user = User.objects.get(pk=userId)
	if 'name' in request.POST:
		user.name = request.POST['name']
	if 'phone' in request.POST:
		user.phone = request.POST['phone']
	if 'address' in request.POST:
		user.address = request.POST['address']
	if 'avatar' in request.POST:
		user.avatar = request.FILES['avatar']
	if 'password' in request.POST:
		password = hashlib.sha256(request.POST['password']).hexdigest()
		user.password = password
	user.save()
	return HttpResponse(200)

# (?P<userId>\d+)/get/
def getUser(request,userId):
	userQuerySet = User.objects.filter(pk=userId)
	return HttpResponse(serializers.serialize("json",userQuerySet))

# login
@csrf_exempt
def login(request):
	user = User.objects.get(account = request.POST['account'])
	password = hashlib.sha256(request.POST['password']).hexdigest()
	if user.password == password:
		return HttpResponse(user.pk)
	else:
		return HttpResponse(-1)

def getAvatar(request,userId):
	user = User.objects.get(pk=userId)
	return HttpResponse(user.avatar)