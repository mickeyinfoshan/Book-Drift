from django.conf.urls import url
from users import views

urlpatterns = [
	url(r'^register/$',views.addUser,name='register'),
	url(r'^(?P<userId>\d+)/update/$',views.updateUser,name='updateUser'),
	url(r'^(?P<userId>\d+)/get/$',views.getUser,name='getUser'),
	url(r'^login/$',views.login,name='login'),
]