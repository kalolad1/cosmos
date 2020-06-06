"""API endpoints for the React frontend."""
from django.contrib import auth
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models


@api_view(['POST'])
def register(request):
    """Registers a new account."""
    account: models.Account
    try:
        account: models.Account = models.Account.objects.create_user(
            email=request.data['email'], password=request.data['password'])
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
