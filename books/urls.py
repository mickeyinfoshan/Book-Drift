from django.conf.urls import url
from books import views

urlpatterns = [
	url(r'^add/by/(?P<userId>\d+)/$',views.addBook,name='addBook'),
	url(r'^(?P<bookId>\d+)/update/$',views.updateBook,name='updateBook'),
	url(r'^(?P<bookId>\d+)/delete/$',views.deleteBook,name='deleteBook'),
	url(r'^(?P<bookId>\d+)/get/$',views.getBook,name='getBook'),
	url(r'^(?P<bookId>\d+)/comment/all/$',views.getComments,name='getComments'),
	url(r'^(?P<bookId>\d+)/comment/add/by/(?P<userId>\d+)/$',views.addComment,name='addComment'),
	url(r'^(?P<bookId>\d+)/like/get/number/$',views.getLikeNumber,name='getLikeNumber'),
	url(r'^(?P<bookId>\d+)/like/by/(?P<userId>\d+)/$',views.addLike,name='addLike'),
	url(r'^all/$',views.getAllBooks,name='getAllBooks'),
	url(r'^available/$',views.addLike,name='addLike'),
	url(r'^popular/$',views.getPopularBooks,name='addLike'),
	url(r'^of/(?P<userId>\d+)/$',views.getUserBooks,name='addLike'),
]