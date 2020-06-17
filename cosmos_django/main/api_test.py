import copy

from django import urls
from rest_framework import status
from rest_framework import test

from . import custom_exceptions
from . import models

TEST_ACCOUNT_REQUEST_DATA = {
    'email': 'test123@gmail.com',
    'password': 'test1234',
    'dateOfBirth': {
        'year': 2020,
        'month': 2,
        'day': 3
    },
    'firstName': 'John',
    'lastName': 'Doe',
    'sex': 'male',
}

TEST_VISIT_REQUEST_DATA = {
    'visitType': 'physical',
    'note': 'This is a test physician note.',
}


class TestApi(test.APITestCase):
    def _create_test_account(self, request_data=None):
        url = urls.reverse('main/accounts')
        if request_data:
            return self.client.post(url, request_data, format='json')
        return self.client.post(url, TEST_ACCOUNT_REQUEST_DATA, format='json')

    def test_create_account_fails_account_already_exists(self):
        self._create_test_account()

        response = self._create_test_account()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data[custom_exceptions.MESSAGE_KEY])
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.AccountAlreadyExistsException.USER_FACING_MESSAGE
        )

    def test_create_account_fails_email_not_provided(self):
        request_data = copy.deepcopy(TEST_ACCOUNT_REQUEST_DATA)
        request_data.pop('email')

        response = self._create_test_account(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewAccountNotProvided.USER_FACING_MESSAGE)

    def test_create_account_fails_password_not_provided(self):
        request_data = copy.deepcopy(TEST_ACCOUNT_REQUEST_DATA)
        request_data.pop('password')

        response = self._create_test_account(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewAccountNotProvided.USER_FACING_MESSAGE)

    def test_create_account_fails_patient_profile_data_not_provided(self):
        request_data = copy.deepcopy(TEST_ACCOUNT_REQUEST_DATA)
        request_data.pop('dateOfBirth')
        request_data.pop('lastName')

        response = self._create_test_account(request_data=request_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewAccountNotProvided.USER_FACING_MESSAGE)

    def test_create_account_succeeds(self):
        response = self._create_test_account()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_account_fails_not_authenticated(self):
        url = urls.reverse('main/accounts')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_account_succeeds(self):
        self._create_test_account()
        self.client.force_authenticate(user=models.Account.objects.first())

        url = urls.reverse('main/accounts')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_visit_fails_not_authenticated(self):
        url = urls.reverse('main/visits')
        response = self.client.post(url,
                                    TEST_VISIT_REQUEST_DATA,
                                    format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_visit_fails_data_not_provided(self):
        self._create_test_account()
        self.client.force_authenticate(user=models.Account.objects.first())
        url = urls.reverse('main/visits')
        request_data = copy.deepcopy(TEST_VISIT_REQUEST_DATA)
        request_data.pop('note')

        response = self.client.post(url, request_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data[custom_exceptions.USER_FACING_MESSAGE_KEY],
            custom_exceptions.DataForNewVisitNotProvided.USER_FACING_MESSAGE)

    def test_create_visit_succeeds(self):
        self._create_test_account()
        self.client.force_authenticate(user=models.Account.objects.first())
        url = urls.reverse('main/visits')

        response = self.client.post(url,
                                    TEST_VISIT_REQUEST_DATA,
                                    format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
