from django.conf.urls import url
from drift import views

urlpatterns = [
	url(r'^(?P<bookId>\d+)/drift/to/(?P<userId>\d+)/$',views.addDrift,name='addDrift'),
	url(r'^(?P<driftId>\d+)/finish/$',views.finishDrift,name='finishDrift'),
	url(r'^(?P<bookId>\d+)/apply/by/(?P<userId>\d+)/$',views.addDriftApply,name='addDriftApply'),
	url(r'^(?P<bookId>\d+)/history/get/$',views.getDriftHistory,name='getDriftHistory'),
	url(r'^(?P<bookId>\d+)/apply/get/$',views.getDriftApplies,name='getDriftApplies'),
]