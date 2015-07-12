from django.shortcuts import render
import json
from django.core import serializers
from books.models import Book
from users.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
#/books

#/add/by/(?P<userId>\d+)/
@csrf_exempt
def addBook(request,userId):
	user = User.objects.get(pk=userId)
	book = Book(originOwner=user,currentOwner=user)
	book.name = request.POST['name']
	book.author = request.POST['author']
	book.kind = request.POST['kind']
	book.description = request.POST['description']
	book.picture = request.FILES['picture']
	book.save()
	return HttpResponse(200)

#(?P<bookId>\d+)/update/
@csrf_exempt
def updateBook(request,bookId):
	book = Book.objects.get(pk=bookId)
	if 'name' in request.POST:
		book.name = request.POST['name']
	if 'author' in request.POST:
		book.author = request.POST['author']
	if 'kind' in request.POST:
		book.kind = request.POST['kind']
	if 'picture' in request.FILES:
		book.picture = request.FILES['picture']
	book.save()
	return HttpResponse(200)

#(?P<bookId>\d+)/delete/
@csrf_exempt
def deleteBook(request,bookId):
	book = Book.objects.get(pk=bookId)
	book.remove()
	return HttpResponse(200)

#(?P<bookId>\d+)/get/
@csrf_exempt
def getBook(request,bookId):
	return HttpResponse(serializers.serialize("json",Book.objects.filter(pk=bookId)))

#all/
@csrf_exempt
def getAllBooks(request):
	return HttpResponse(serializers.serialize("json",Book.objects.all()))

#(?P<bookId>\d+)/comment/all/
@csrf_exempt
def getComments(request,bookId):
	book = Book.objects.get(pk=bookId)
	comments = book.comment_set.all()
	return HttpResponse(serializers.serialize("json",comments))

#(?P<bookId>\d+)/comment/add/by/(?P<userId>\d+)/
@csrf_exempt
def addComment(request,bookId,userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=userId)
	content = request.POST['content']
	mark = int(request.POST['mark'])
	book.comment_set.create(content=content, mark=mark, user=user)
	return HttpResponse(200)

#(?P<bookId>\d+)/like/get/
@csrf_exempt
def getLikeNumber(request,bookId):
	book = Book.objects.get(pk=bookId)
	return HttpResponse(book.like_set.count())

#(?P<bookId>\d+)/like/add/by/(?P<userId>\d+)/
@csrf_exempt
def addLike(request, bookId, userId):
	book = Book.objects.get(pk=bookId)
	user = User.objects.get(pk=userId)
	if book.like_set.filter(book=book, user=user).exists():
		return HttpResponse(500)
	book.like_set.create(book=book,user=user)
	return HttpResponse(200)

# available
@csrf_exempt
def getBooksAvailable(request):
	books = Book.objects.filter(isFinished=True)
	return HttpResponse(serializers.serialize("json",books))

def getUserBooks(request,userId):
	user = User.objects.get(pk=userId)
	books = Book.objects.filter(currentOwner=user)
	return HttpResponse(serializers.serialize("json",books))

def getPopularBooks(request):
	books = Book.objects.all()
	sortedBooks = sorted(books,key=lambda book:len(book.like_set.all()),reverse=True)
	return HttpResponse(serializers.serialize("json",sortedBooks[:4]))