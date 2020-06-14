import copy

from django import urls
from rest_framework import status
from rest_framework import test

from . import custom_exceptions

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
    'sex': 'male'
}


class TestApi(test.APITestCase):
    def _get_test_account_request_data(self):
        return

    def _create_test_account(self, request_data=None):
        url = urls.reverse('account/accounts')
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
        pass

    def test_get_account_fails_not_authenticated(self):
        pass

    def test_get_account_succeeds(self):
        pass

    def test_create_visit_fails_not_authenticated(self):
        pass

    def test_create_visit_fails_data_not_provided(self):
        pass

    def test_create_visit_succeeds(self):
        pass
