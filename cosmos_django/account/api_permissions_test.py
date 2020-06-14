from django import http
from django import urls
from rest_framework import request
from rest_framework import test

from . import api
from . import api_permissions
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


class TestAccountsPermissions(test.APITestCase):
    def setUp(self):
        self.account_permissions = api_permissions.AccountsPermissions()

    def _create_test_account(self):
        url = urls.reverse('account/accounts')
        return self.client.post(url, TEST_ACCOUNT_REQUEST_DATA, format='json')

    def test_create_new_account_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.POST
        rest_request = request.Request(http_request)

        expected_permission = self.account_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_get_account_fails_no_authentication(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.GET
        rest_request = request.Request(http_request)

        expected_permission = self.account_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_account_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.GET

        self._create_test_account()
        test.force_authenticate(http_request,
                                user=models.Account.objects.first())
        rest_request = request.Request(http_request)

        expected_permission = self.account_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_unauthorized_http_method(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.PUT
        rest_request = request.Request(http_request)

        expected_permission = self.account_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)
