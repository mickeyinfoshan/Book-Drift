from django.shortcuts import render
from users.models import User
from books.models import Book
from drift.models import Drift,DriftApply
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import datetime
# Create your views here.
@csrf_exempt
def addDrift(request,bookId,userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=bookId)
	try:
		currentDrift = Drift.objects.get(book=book,lendTo=user)
		currentDrift.end = datetime.date.now()
		currentDrift.isFinished = True
		currentDrift.save()
	except Exception:
		pass	
	d = Drift(book=book,lendTo=user)
	d.save()
	book.currentOwner = user
	book.save()
	return HttpResponse(200)

def finishDrift(reuqest,driftId):
	d = Drift.objects.get(pk=driftId)
	d.isFinished = True
	d.end = datetime.date.now()
	d.save()
	"""
	user = d.lendTo
	book = d.book
	driftApply = DriftApply.objects.get(user=user,book=book)
	nextApplyId = driftApply.pk + 1
	querySet = DriftApply.objects.filter(pk=nextApplyId)
	"""
	return HttpResponse(200)

def addDriftApply(request,bookId,userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=bookId)
	if book.currentOwner == user:
		return HttpResponse(500)
	driftApply = DriftApply(book=book,user=user)
	driftApply.save()
	return HttpResponse(200)

def getDriftHistory(request,bookId):
	book = Book.objects.get(pk=bookId)
	querySet = Drift.objects.filter(book=book)
	return HttpResponse(serializers.serialize("json",querySet))

def getDriftApplies(request,bookId):
	book = Book.objects.get(pk=bookId)
	querySet = DriftApply.objects.filter(book=book)
	return HttpResponse(serializers.serialize("json",querySet))

def getNextApply(request,bookId):
	book = Book.objects.get(pk=bookId)
	user = book.currentOwner
	currentApply = DriftApply.objects.filter(book=book,user=user).order_by('-createTime')
	if currentApply.exists():
		currentApply = currentApply[0]
		nextApplyId = currentApply.pk + 1
	else:
		nextApply = DriftApply.objects.filter(book=book).order_by('pk')
		if nextApply.exists():
			nextApplyId = nextApply[0].pk
		else:
			nextApplyId = -1
	querySet = DriftApply.objects.filter(pk=nextApplyId)
	return HttpResponse(serializers.serialize("json",querySet))
