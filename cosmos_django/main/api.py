"""API endpoints for the React frontend to consume.

Payloads send by server will be in snake_case and converted to camelCase by
middleware before reaching the client. The client will send payloads in
camelCase, which will be converted to snake_case by middleware before they reach
API endpoints.

tldr; When on server, expect snake_case everywhere, when on client, expect
camelCase everywhere.
"""
import datetime
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
            email = request.data['email']
            password = request.data['password']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            year = request.data['date_of_birth']['year']
            month = request.data['date_of_birth']['month']
            day = request.data['date_of_birth']['day']
            sex = request.data['sex']
        except KeyError:
            custom_exception = custom_exceptions.DataForNewUserNotProvided()
            return response.Response(
                data=custom_exception.get_response_format(),
                status=status.HTTP_400_BAD_REQUEST)

        user: models.User
        try:
            user = models.User.objects.create_user(email=email,
                                                   password=password)
        except custom_exceptions.UserAlreadyExistsException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        date_of_birth: datetime.date = datetime.date(year=year,
                                                     month=month,
                                                     day=day)
        models.PatientProfile.objects.create(user=user,
                                             first_name=first_name,
                                             last_name=last_name,
                                             date_of_birth=date_of_birth,
                                             sex=sex)

        serialized_user: serializers.UserSerializer = serializers.UserSerializer(
            instance=user)
        logging.info('Registering new user with data %s.',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        user = models.User.objects.get(id=request.user.id)
        for attribute, value in request.data.items():
            if attribute == 'patient_profile':
                for pp_attribute, pp_value in value.items():
                    setattr(user.patient_profile, pp_attribute, pp_value)
            else:
                setattr(user, attribute, value)
        user.save()
        user.patient_profile.save()

        serialized_user: serializers.UserSerializer = serializers.UserSerializer(
            instance=user)
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
        """Adds a new visit for the user."""
        try:
            encounter_type = request.data['encounter_type']
            note = request.data['note']
        except KeyError:
            custom_exception = custom_exceptions.DataForNewEncounterNotProvided(
            )
            return response.Response(
                data=custom_exception.get_response_format(),
                status=status.HTTP_400_BAD_REQUEST)

        encounter: models.Encounter = models.Encounter.objects.create(
            patient_profile=request.user.patient_profile,
            encounter_type=encounter_type,
            note=note)

        serialized_encounter: serializers.EncounterSerializer = serializers.EncounterSerializer(
            instance=encounter)
        logging.info('Creating a new encounter with data: %s.',
                     json.dumps(serialized_encounter.data))
        return response.Response(data=serialized_encounter.data,
                                 status=status.HTTP_201_CREATED)
