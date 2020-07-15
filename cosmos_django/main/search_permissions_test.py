from django import http
from django import urls
from rest_framework import request
from rest_framework import test

from . import models
from . import search_permissions
from . import test_fixtures
from .util import api_util


class TestSearchPermissions(test.APITestCase):
    def setUp(self) -> None:
        self.search_permission = search_permissions.SearchPermissions()

    def _create_test_user(self):
        url = urls.reverse('main/users')
        return self.client.post(url,
                                test_fixtures.TEST_USER_REQUEST_DATA,
                                format='json')

    def test_search_no_permission(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.POST.name
        rest_request = request.Request(http_request)

        expected_permission = self.search_permission.has_permission(
            request=rest_request)

        self.assertFalse(expected_permission)

    def test_search_has_permission(self):
        http_request = http.HttpRequest()
        http_request.method = api_util.HTTPMethod.POST.name

        self._create_test_user()
        test.force_authenticate(http_request, user=models.User.objects.first())
        rest_request = request.Request(http_request)

        expected_permission = self.search_permission.has_permission(
            request=rest_request)

        self.assertTrue(expected_permission)
