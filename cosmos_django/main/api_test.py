"""Tests for api.py"""
# pylint: disable=missing-docstring
import copy
from dateutil import parser

from django import urls
from rest_framework import status
from rest_framework import test

from . import api
from . import custom_exceptions
from . import models

TEST_USER_REQUEST_DATA = {
    'email': 'test123@gmail.com',
    'password': 'test1234',
    'date_of_birth': "2017-06-27T20:48:49.065Z",
    'first_name': 'John',
    'last_name': 'Doe',
    'sex': 'male',
    'is_provider': False,
}

TEST_USER_PUT_REQUEST_DATA = {
    'email': 'another@gmail.com',
    'patient_profile': {
        'first_name': 'Billy',
        'date_of_birth': '2000-06-27T20:48:49.065Z',
        'phone_number': '18564985939',
        'address': {
            'address_line': '1600 Penn Ave',
            'city': 'Washington DC',
            'state': 'Maryland',
            'zip_code': '00600',
        },
        'race': 'white',
        'ethnicity': 'indian',
        'religion': 'Hindu',
        'insurance': 'Aetna',
        'pharmacy': 'Walgreens',
    }
}

TEST_ENCOUNTER_REQUEST_DATA = {
    'encounter_type': 'physical',
    'note': 'This is a test physician note.',
    'significance_band': 'low',
}


class TestApi(test.APITestCase):
    def setUp(self) -> None:
        self.factory = test.APIRequestFactory()

    def _create_test_user(self, request_data=None):
        url = urls.reverse('main/users')
        if request_data:
            return self.client.post(url, request_data, format='json')
        return self.client.post(url, TEST_USER_REQUEST_DATA, format='json')

    def test_create_user_fails_user_already_exists(self):
        self._create_test_user()

        response = self._create_test_user()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data[custom_exceptions.MESSAGE_KEY])
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.UserAlreadyExistsException.USER_FACING_MESSAGE)

    def test_create_user_fails_email_not_provided(self):
        request_data = copy.deepcopy(TEST_USER_REQUEST_DATA)
        request_data.pop('email')

        response = self._create_test_user(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewUserNotProvidedException.
            USER_FACING_MESSAGE)

    def test_create_user_fails_password_not_provided(self):
        request_data = copy.deepcopy(TEST_USER_REQUEST_DATA)
        request_data.pop('password')

        response = self._create_test_user(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewUserNotProvidedException.
            USER_FACING_MESSAGE)

    def test_create_user_fails_patient_profile_data_not_provided(self):
        request_data = copy.deepcopy(TEST_USER_REQUEST_DATA)
        request_data.pop('date_of_birth')
        request_data.pop('last_name')

        response = self._create_test_user(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewUserNotProvidedException.
            USER_FACING_MESSAGE)

    def test_create_user_succeeds(self):
        response = self._create_test_user()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_user_fails_not_authenticated(self):
        url = urls.reverse('main/users', kwargs={'user_id': 0})
        response = self.client.put(url,
                                   TEST_USER_PUT_REQUEST_DATA,
                                   format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_fails_updating_email_to_existing_user(self):
        request_data = {
            'email': 'test123@gmail.com',
            'password': 'test1234',
            'date_of_birth': "2017-06-27T20:48:49.065Z",
            'first_name': 'John',
            'last_name': 'Doe',
            'sex': 'male',
            'is_provider': False,
        }
        self._create_test_user(request_data)
        request_data['email'] = 'test456@gmail.com'
        self._create_test_user(request_data)

        user = models.User.objects.get(email='test456@gmail.com')
        url = urls.reverse('main/users', kwargs={'user_id': user.id})

        update_request_data = copy.deepcopy(TEST_USER_PUT_REQUEST_DATA)
        update_request_data['email'] = 'test123@gmail.com'
        request = self.factory.put(url, update_request_data, format='json')
        request.context = {
            'kwargs': {
                'user_id': user.id,
            }
        }

        test.force_authenticate(request, user=user)
        view = api.UsersEndpoint.as_view()
        response = view(request, user.id)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.UpdatingUserToExistingEmailException.
            USER_FACING_MESSAGE)

    def test_update_user_succeeds(self):
        self._create_test_user()
        user = models.User.objects.first()

        url = urls.reverse('main/users', kwargs={'user_id': user.id})
        request = self.factory.put(url,
                                   TEST_USER_PUT_REQUEST_DATA,
                                   format='json')
        request.context = {
            'kwargs': {
                'user_id': user.id,
            }
        }

        test.force_authenticate(request, user=user)
        view = api.UsersEndpoint.as_view()
        response = view(request, user.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'],
                         TEST_USER_PUT_REQUEST_DATA['email'])
        self.assertEqual(
            response.data['patient_profile']['first_name'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['first_name'])
        self.assertEqual(
            response.data['patient_profile']['date_of_birth'],
            parser.parse(TEST_USER_PUT_REQUEST_DATA['patient_profile']
                         ['date_of_birth']).date().__str__())
        self.assertDictEqual(
            response.data['patient_profile']['address'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['address'])
        self.assertEqual(response.data['patient_profile']['race'],
                         TEST_USER_PUT_REQUEST_DATA['patient_profile']['race'])
        self.assertEqual(
            response.data['patient_profile']['ethnicity'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['ethnicity'])
        self.assertEqual(
            response.data['patient_profile']['religion'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['religion'])
        self.assertEqual(
            response.data['patient_profile']['insurance'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['insurance'])
        self.assertEqual(
            response.data['patient_profile']['pharmacy'],
            TEST_USER_PUT_REQUEST_DATA['patient_profile']['pharmacy'])

    def test_get_user_fails_not_authenticated(self):
        url = urls.reverse('main/users')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_succeeds(self):
        self._create_test_user()
        user = models.User.objects.first()

        url = urls.reverse('main/users')
        request = self.factory.get(url, format='json')

        test.force_authenticate(request, user=user)
        view = api.UsersEndpoint.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_encounter_fails_not_authenticated(self):
        url = urls.reverse('main/encounters')
        response = self.client.post(url,
                                    TEST_ENCOUNTER_REQUEST_DATA,
                                    format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_encounter_fails_data_not_provided(self):
        self._create_test_user()
        # pylint: disable=no-member
        self.client.force_authenticate(user=models.User.objects.first())
        url = urls.reverse('main/encounters')
        request_data = copy.deepcopy(TEST_ENCOUNTER_REQUEST_DATA)
        request_data.pop('note')

        response = self.client.post(url, request_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewEncounterNotProvidedException.
            USER_FACING_MESSAGE)

    def test_create_encounter_succeeds(self):
        self._create_test_user()
        # pylint: disable=no-member
        self.client.force_authenticate(user=models.User.objects.first())
        url = urls.reverse('main/encounters')

        response = self.client.post(url,
                                    TEST_ENCOUNTER_REQUEST_DATA,
                                    format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
