from django.contrib import admin
from books.models import Book,Comment,Like
# Register your models here.
admin.site.register(Book)
admin.site.register(Comment)
admin.site.register(Like)
