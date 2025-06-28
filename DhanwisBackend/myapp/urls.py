from django.urls import path

from myapp import views

from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [

    path('dhanwis/token/',views.GetToken.as_view()),

    path('dhanwis/portfolio/',views.PortfolioCreateApiView.as_view()),

    path('dhanwis/portfolio/<int:pk>/',views.PortfolioRetrieveUpdateDestroy.as_view()),

    path('dhanwis/careers/',views.CareerCreateView.as_view()),

    path('dhanwis/careers/<int:pk>/',views.CareerRetrieveUpdateDistroy.as_view()),

    path('dhanwis/portfolio/list/',views.PortfolioListApiView.as_view()),

    path('dhanwis/careers/list/',views.CareerListApiView.as_view())

    
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


