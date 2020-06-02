import json

from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html',
                  {'user_id': json.dumps(request.user.patient_profile.id)})
