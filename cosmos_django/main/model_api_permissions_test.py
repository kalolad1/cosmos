from django import http
from django import urls
from rest_framework import request
from rest_framework import test

from . import model_api_permissions
from . import models
from . import test_fixtures
from .util import api_util


class TestUsersPermissions(test.APITestCase):
    def setUp(self):
        self.user_permissions = model_api_permissions.UsersPermissions()

    def _create_test_user(self):
        url = urls.reverse('main/users')
        return self.client.post(url,
                                test_fixtures.TEST_USER_REQUEST_DATA,
                                format='json')

    def test_create_new_user_has_permission(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.POST.name
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_update_user_has_permission(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.PUT.name

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)
        rest_request.context = {
            'kwargs': {
                'user_id': models.User.objects.first().id
            }
        }

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_update_user_no_authentication(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.PUT.name

        self._create_test_user()
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_update_user_fails_updates_unauthorized_user(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.PUT.name

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)
        rest_request.context = {
            'kwargs': {
                'user_id': models.User.objects.first().id + 1,
            }
        }

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_user_fails_no_authentication(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.GET
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_user_fails_accesses_unauthorized_account(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.GET

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)
        rest_request.context = {
            'kwargs': {
                'user_id': models.User.objects.first().id + 1,
            }
        }

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_get_user_succeeds(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.GET.name

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)
        rest_request.context = {
            'kwargs': {
                'user_id': models.User.objects.first().id,
            }
        }

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)

    def test_unauthorized_http_method(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.PUT.name
        rest_request = request.Request(http_request)

        expected_permission = self.user_permissions.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)
