"""API endpoints for the React frontend to consume.

Payloads send by server will be in snake_case and converted to camelCase by
middleware before reaching the client. The client will send payloads in
camelCase, which will be converted to snake_case by middleware before they reach
API endpoints.

tldr; When on server, expect snake_case everywhere, when on client, expect
camelCase everywhere.
"""
import logging
import json

from rest_framework.request import Request
from rest_framework import response
from rest_framework import status
from rest_framework import views

from . import custom_permissions
from . import custom_exceptions
from . import models
from . import serializers


class HTTPMethod:
    """Defines HTTP method constants."""
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'


class AccountsEndpoint(views.APIView):
    """Endpoints for Account objects."""
    permission_classes = (custom_permissions.UsersPermissions, )

    def post(self, request: Request) -> response.Response:
        """Registers a new account."""
        try:
            user: models.User = models.User.objects.create_user_from_json(
                data=request.data)
        except custom_exceptions.DataForNewUserNotProvidedException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)
        except custom_exceptions.UserAlreadyExistsException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_user: serializers.UserSerializer = serializers.UserSerializer(
            instance=user)
        logging.info('Registering new user with data %s.',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        request.user.update_from_json(data=request.data)
        serialized_user: serializers.UserSerializer = serializers.UserSerializer(
            instance=request.user)
        logging.info('Updating user: now has data %s.',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_200_OK)

    def get(self, request: Request) -> response.Response:
        """Returns the users main if they are authenticated."""
        serialized_user: serializers.UserSerializer = serializers.UserSerializer(
            instance=request.user)
        logging.info('Getting the following user data: %s',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_200_OK)


class EncountersEndpoint(views.APIView):
    """Endpoints for Encounter objects."""
    permission_classes = (custom_permissions.EncountersPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new encounter for the user."""
        try:
            encounter: models.Encounter = models.Encounter.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataForNewEncounterNotProvidedException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_encounter: serializers.EncounterSerializer = serializers.EncounterSerializer(
            instance=encounter)
        logging.info('Creating a new encounter with data: %s.',
                     json.dumps(serialized_encounter.data))
        return response.Response(data=serialized_encounter.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        """Updates an existing encounter."""
        try:
            encounter: models.Encounter = models.Encounter.objects.get(
                id=request.data.pop('id'))
        except models.Encounter.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            encounter.update_from_json(request.data)
        except Exception:
            pass
        else:
            serialized_encounter: serializers.EncounterSerializer = serializers.EncounterSerializer(
                instance=encounter)
            logging.info('Updating encounter with new data: %s.',
                         json.dumps(serialized_encounter.data))
            return response.Response(data=serialized_encounter.data,
                                     status=status.HTTP_200_OK)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)
