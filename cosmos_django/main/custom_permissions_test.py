from django import http
from django import urls
from rest_framework import request
from rest_framework import test

from . import api
from . import custom_permissions
from . import models

TEST_USER_REQUEST_DATA = {
    'email': 'test123@gmail.com',
    'password': 'test1234',
    'date_of_birth': {
        'year': 2020,
        'month': 2,
        'day': 3
    },
    'first_name': 'John',
    'last_name': 'Doe',
    'sex': 'male',
}


class TestUsersPermissions(test.APITestCase):
    def setUp(self):
        self.user_permissions = custom_permissions.UsersPermissions()

    def _create_test_user(self):
        url = urls.reverse('main/users')
        return self.client.post(url, TEST_USER_REQUEST_DATA, format='json')

    def test_create_new_user_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.POST
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_put_new_user_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.PUT

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_put_new_user_fails_no_authentication(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.PUT

        self._create_test_user()
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_user_fails_no_authentication(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.GET
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_user_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.GET

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_unauthorized_http_method(self):
        http_request = http.HttpRequest()
        http_request.method = api.HTTPMethod.PUT
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)
