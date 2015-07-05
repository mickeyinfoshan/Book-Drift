from django.shortcuts import render
from users.models import User
from books.models import Book
from drift.models import Drift,DriftApply
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def addDrift(request,bookId,userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=bookId)
	d = Drift(book=book,lendTo=user)
	if 'end' in request.POST:
		d.end = request.POST['end']
	d.save()
	book.currentOwner = user
	book.save()
	return HttpResponse(200)

def finishDrift(reuqest,driftId):
	d = Drift.objects.get(pk=driftId)
	d.isFinished = True
	user = d.lendTo
	book = d.book
	driftApply = DriftApply.objects.get(user=user,book=book)
	nextApplyId = driftApply.pk + 1
	querySet = DriftApply.objects.filter(pk=nextApplyId)
	return HttpResponse(serializers.serialize("json",querySet))

def addDriftApply(request,bookId,userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=bookId)
	driftApply = DriftApply(book=book,user=user)
	driftApply.save()
	return HttpResponse(200)

def getDriftHistory(request,bookId):
	book = Book.objects.get(pk=bookId)
	querySet = Drift.objects.fitler(book=book)
	return HttpResponse(serializers.serialize("json",querySet))

def getDriftApplies(request,bookId):
	book = Book.objects.get(pk=bookId)
	querySet = DriftApply.objects.fitler(book=book)
	return HttpResponse(serializers.serialize("json",querySet))
