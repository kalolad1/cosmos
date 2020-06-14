"""Contains custom exception classes."""
import abc
from typing import Dict

MESSAGE_KEY = 'message'
USER_FACING_MESSAGE_KEY = 'user_facing_message'


class CustomException(Exception):
    def __init__(self, message=None):
        super().__init__(message)
        if message:
            self.message = message

    @abc.abstractmethod
    def get_user_facing_message(self):
        """Override by subclasses."""
        pass

    def get_response_format(self):
        response: Dict[str, str] = dict()
        response[USER_FACING_MESSAGE_KEY] = self.get_user_facing_message()
        if hasattr(self, 'message'):
            response[MESSAGE_KEY] = self.message
        return response


class AccountAlreadyExistsException(CustomException):
    USER_FACING_MESSAGE = 'An account already exists with that email.'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class DataForNewAccountNotProvided(CustomException):
    USER_FACING_MESSAGE = 'Email or password was not provided!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE
