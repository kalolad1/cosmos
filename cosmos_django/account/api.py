"""API endpoints for the React frontend to consume."""
import datetime
import logging

from django.db.utils import IntegrityError
from rest_framework import decorators
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework import response
from rest_framework import status
from rest_framework import views

from . import models
from . import serializers


class HTTPMethod:
    GET = 'GET'
    POST = 'POST'


class AccountsEndpoint(views.APIView):
    def post(self, request: Request) -> response.Response:
        """Registers a new account."""
        logging.info(msg='Registering new account with request data {}.'.
                     format(request.data.__str__()))
        account: models.Account
        try:
            account = models.Account.objects.create_user(
                email=request.data['email'], password=request.data['password'])
            date_of_birth: datetime.date = datetime.date(
                request.data['dateOfBirth']['year'],
                request.data['dateOfBirth']['month'],
                request.data['dateOfBirth']['day'])
            models.PatientProfile.objects.create(
                account=account,
                first_name=request.data['firstName'],
                last_name=request.data['lastName'],
                date_of_birth=date_of_birth,
                sex=request.data['sex'])
        except IntegrityError:
            return response.Response(
                data='An account already exists with that email.',
                status=status.HTTP_400_BAD_REQUEST)
        except ValueError as value_error:
            return response.Response(data=value_error.__str__(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_account: serializers.AccountSerializer = serializers.AccountSerializer(
            instance=account)
        return response.Response(data=serialized_account.data,
                                 status=status.HTTP_201_CREATED)

    @decorators.permission_classes(
        permission_classes=(permissions.IsAuthenticated, ))
    def get(self, request: Request) -> response.Response:
        """Returns the users account if they are authenticated."""
        logging.info(msg='Request for account data with data: {}.'.format(
            request.data.__str__()))
        serialized_account: serializers.AccountSerializer = serializers.AccountSerializer(
            instance=request.user)
        return response.Response(data=serialized_account.data,
                                 status=status.HTTP_200_OK)


class VisitsEndpoint(views.APIView):
    @decorators.permission_classes(
        permission_classes=(permissions.IsAuthenticated, ))
    def post(self, request: Request) -> response.Response:
        """Adds a new visit for the user."""
        logging.info(msg='Creating a new visit with data: {}.'.format(
            request.data.__str__()))
        visit: models.Visit
        try:
            visit = models.Visit.objects.create(
                patient_profile=request.user.patient_profile,
                visit_type=request.data['visitType'],
                note=request.data['note'])
        except ValueError as value_error:
            return response.Response(data=value_error.__str__(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_visit: serializers.VisitSerializer = serializers.VisitSerializer(
            instance=visit)
        return response.Response(data=serialized_visit.data,
                                 status=status.HTTP_201_CREATED)
