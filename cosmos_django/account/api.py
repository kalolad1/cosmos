"""API endpoints for the React frontend."""
import datetime

from django.db.utils import IntegrityError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models
from django.contrib.auth import logout


@api_view(['POST'])
def register(request):
    """Registers a new account."""
    print('Registering a new account.')
    logout(request)
    account: models.Account
    try:
        account: models.Account = models.Account.objects.create_user(
            email=request.data['email'], password=request.data['password'])
        date_of_birth = datetime.date(request.data['dateOfBirth']['year'],
                                      request.data['dateOfBirth']['month'],
                                      request.data['dateOfBirth']['day'])
        models.PatientProfile.objects.create(
            account=account,
            first_name=request.data['firstName'],
            last_name=request.data['lastName'],
            date_of_birth=date_of_birth)
    except IntegrityError:
        return Response('An account already exists with that email!',
                        status=status.HTTP_400_BAD_REQUEST)
    except ValueError as ve:
        return Response({'error': {'message': ve.__str__()}})

    serialized_account = serializers.AccountSerializer(instance=account)
    return Response(serialized_account.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account(request):
    """Gets an account. Must have access token in request header."""
    serialized_account = serializers.AccountSerializer(instance=request.user)
    return Response(serialized_account.data, status=status.HTTP_200_OK)
