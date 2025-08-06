from django.urls import path
from .views import GradeReportView

urlpatterns = [
    path('rekap/', GradeReportView.as_view(), name='grade_report'),
] 