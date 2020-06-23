from django.test import TestCase

from . import custom_exceptions


class TestCustomExceptions(TestCase):
    def test_get_response_format(self):
        exception = custom_exceptions.UserAlreadyExistsException(
            'User already exists message.')

        response_format = exception.get_response_format()

        expected_response_format = {
            'message': 'User already exists message.',
            'user_facing_message': 'A user already exists with that email!',
        }
        self.assertDictEqual(response_format, expected_response_format)
