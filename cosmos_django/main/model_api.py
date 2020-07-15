"""API endpoints for the React frontend to consume.

Payloads send by server will be in snake_case and converted to camelCase by
middleware before reaching the client. The client will send payloads in
camelCase, which will be converted to snake_case by middleware before they reach
API endpoints.

tldr; When on server, expect snake_case everywhere, when on client, expect
camelCase everywhere.
"""
# pylint: disable=R0201
import logging
import json

from rest_framework.request import Request
from rest_framework import response
from rest_framework import status
from rest_framework import views

from . import custom_exceptions
from . import model_api_permissions
from . import models
from . import serializers


class UsersEndpoint(views.APIView):
    """Endpoints for User objects."""
    permission_classes = (model_api_permissions.UsersPermissions, )

    def post(self, request: Request) -> response.Response:
        """Registers a new user."""
        try:
            user: models.User = models.User.objects.create_user_from_json(
                data=request.data)
        except custom_exceptions.DataForNewUserNotProvidedException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)
        except custom_exceptions.UserAlreadyExistsException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_user = serializers.UserSerializer(instance=user)
        logging.info('Registering new user with data %s.',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request, user_id: int) -> response.Response:
        """Update a user."""
        try:
            user: models.User = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return response.Response(data=custom_exceptions.ObjectDoesNotExist(
            ).get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)
        try:
            user.update_from_json(data=request.data)
        except custom_exceptions.UpdatingUserToExistingEmailException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_user = serializers.UserSerializer(instance=user)
        logging.info('Updating user: now has data %s.',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_200_OK)

    def get(self, request: Request, user_id=None) -> response.Response:
        """Returns the authenticated user, or the user specified by user_id.

        If user_id is provided, the authenticated must have sufficient
        permissions to request their user object.
        """
        user: models.User = request.user
        if user_id:
            try:
                user = models.User.objects.get(id=user_id)
            except models.User.DoesNotExist as e:
                return response.Response(data=e.__dict__,
                                         status=status.HTTP_400_BAD_REQUEST)
        serialized_user = serializers.UserSerializer(instance=user)
        logging.info('Getting the following user data: %s',
                     json.dumps(serialized_user.data))
        return response.Response(data=serialized_user.data,
                                 status=status.HTTP_200_OK)


class EncountersEndpoint(views.APIView):
    """Endpoints for Encounter objects."""
    permission_classes = (model_api_permissions.EncountersPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new encounter for the user."""
        try:
            encounter: models.Encounter = models.Encounter.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataForNewEncounterNotProvidedException as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_encounter = serializers.EncounterSerializer(
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

        encounter.update_from_json(request.data)
        serialized_encounter = serializers.EncounterSerializer(
            instance=encounter)
        logging.info('Updating encounter with new data: %s.',
                     json.dumps(serialized_encounter.data))
        return response.Response(data=serialized_encounter.data,
                                 status=status.HTTP_200_OK)

    def delete(self, request: Request) -> response.Response:
        """Deletes an encounter."""
        try:
            encounter: models.Encounter = models.Encounter.objects.get(
                id=request.data.pop('id'))
        except models.Encounter.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        encounter.delete()
        logging.info('Deleting encounter')
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class DiagnosesEndpoint(views.APIView):
    """Endpoints for Diagnosis objects."""
    permission_classes = (model_api_permissions.DiagnosesPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new diagnosis for the user."""
        try:
            diagnosis: models.Diagnosis = models.Diagnosis.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataNotProvided as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_diagnosis = serializers.DiagnosisSerializer(
            instance=diagnosis)
        logging.info('Creating a new diagnosis with data: %s.',
                     json.dumps(serialized_diagnosis.data))
        return response.Response(data=serialized_diagnosis.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        """Updates an existing diagnosis."""
        try:
            diagnosis: models.Diagnosis = models.Diagnosis.objects.get(
                id=request.data.pop('id'))
        except models.Diagnosis.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        diagnosis.update_from_json(request.data)
        serialized_diagnosis = serializers.DiagnosisSerializer(
            instance=diagnosis)
        logging.info('Updating diagnosis with new data: %s.',
                     json.dumps(serialized_diagnosis.data))
        return response.Response(data=serialized_diagnosis.data,
                                 status=status.HTTP_200_OK)

    def delete(self, request: Request) -> response.Response:
        """Deletes a diagnosis."""
        try:
            diagnosis: models.Diagnosis = models.Diagnosis.objects.get(
                id=request.data.pop('id'))
        except models.Diagnosis.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        diagnosis.delete()
        logging.info('Deleting diagnosis')
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class MedicationsEndpoint(views.APIView):
    """Endpoints for Medication objects."""
    permission_classes = (model_api_permissions.MedicationsPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new medication for the user."""
        try:
            medication: models.Medication = models.Medication.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataNotProvided as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_medication = serializers.MedicationSerializer(
            instance=medication)
        logging.info('Creating a new medication with data: %s.',
                     json.dumps(serialized_medication.data))
        return response.Response(data=serialized_medication.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        """Updates an existing medication."""
        try:
            medication: models.Medication = models.Medication.objects.get(
                id=request.data.pop('id'))
        except models.Medication.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        medication.update_from_json(request.data)
        serialized_medication = serializers.MedicationSerializer(
            instance=medication)
        logging.info('Updating medication with new data: %s.',
                     json.dumps(serialized_medication.data))
        return response.Response(data=serialized_medication.data,
                                 status=status.HTTP_200_OK)

    def delete(self, request: Request) -> response.Response:
        """Deletes a medication."""
        try:
            medication: models.Medication = models.Medication.objects.get(
                id=request.data.pop('id'))
        except models.Medication.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        medication.delete()
        logging.info('Deleting medication')
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class AllergiesEndpoint(views.APIView):
    """Endpoints for Allergy objects."""
    permission_classes = (model_api_permissions.AllergiesPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new allergy for the user."""
        try:
            allergy: models.Allergy = models.Allergy.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataNotProvided as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_allergy = serializers.AllergySerializer(instance=allergy)
        logging.info('Creating a new allergy with data: %s.',
                     json.dumps(serialized_allergy.data))
        return response.Response(data=serialized_allergy.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        """Updates an existing allergy."""
        try:
            allergy: models.Allergy = models.Allergy.objects.get(
                id=request.data.pop('id'))
        except models.Allergy.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        allergy.update_from_json(request.data)
        serialized_allergy = serializers.AllergySerializer(instance=allergy)
        logging.info('Updating allergy with new data: %s.',
                     json.dumps(serialized_allergy.data))
        return response.Response(data=serialized_allergy.data,
                                 status=status.HTTP_200_OK)

    def delete(self, request: Request) -> response.Response:
        """Deletes a allergy."""
        try:
            allergy: models.Allergy = models.Allergy.objects.get(
                id=request.data.pop('id'))
        except models.Allergy.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        allergy.delete()
        logging.info('Deleting allergy')
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class VaccinationsEndpoint(views.APIView):
    """Endpoints for Vaccination objects."""
    permission_classes = (model_api_permissions.VaccinationsPermissions, )

    def post(self, request: Request) -> response.Response:
        """Adds a new vaccination for the user."""
        try:
            vaccination = models.Vaccination.create_from_json(
                data=request.data,
                patient_profile=request.user.patient_profile)
        except custom_exceptions.DataNotProvided as e:
            return response.Response(data=e.get_response_format(),
                                     status=status.HTTP_400_BAD_REQUEST)

        serialized_vaccination = serializers.VaccinationSerializer(
            instance=vaccination)
        logging.info('Creating a new vaccination with data: %s.',
                     json.dumps(serialized_vaccination.data))
        return response.Response(data=serialized_vaccination.data,
                                 status=status.HTTP_201_CREATED)

    def put(self, request: Request) -> response.Response:
        """Updates an existing vaccination."""
        try:
            vaccination: models.Vaccination = models.Vaccination.objects.get(
                id=request.data.pop('id'))
        except models.Vaccination.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        vaccination.update_from_json(request.data)
        serialized_vaccination = serializers.VaccinationSerializer(
            instance=vaccination)
        logging.info('Updating vaccination with new data: %s.',
                     json.dumps(serialized_vaccination.data))
        return response.Response(data=serialized_vaccination.data,
                                 status=status.HTTP_200_OK)

    def delete(self, request: Request) -> response.Response:
        """Deletes a vaccination."""
        try:
            vaccination: models.Vaccination = models.Vaccination.objects.get(
                id=request.data.pop('id'))
        except models.Vaccination.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        vaccination.delete()
        logging.info('Deleting vaccination')
        return response.Response(status=status.HTTP_204_NO_CONTENT)
