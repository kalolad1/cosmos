"""Contains custom exception classes."""
import abc
from typing import Dict

MESSAGE_KEY = 'message'
USER_FACING_MESSAGE_KEY = 'user_facing_message'


class CustomException(Exception):
    """Base class for custom exceptions."""
    def __init__(self, message=None):
        super().__init__(message)
        if message:
            self.message = message

    @abc.abstractmethod
    def get_user_facing_message(self):
        """Override by subclasses."""

    def get_response_format(self):
        """Gets the error message in a response format to be sent to client."""
        response: Dict[str, str] = dict()
        response[USER_FACING_MESSAGE_KEY] = self.get_user_facing_message()
        if hasattr(self, 'message'):
            response[MESSAGE_KEY] = self.message
        return response


class UserAlreadyExistsException(CustomException):
    """Called if trying to create user with an existing user email."""
    USER_FACING_MESSAGE = 'A user already exists with that email!'

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class DataForNewUserNotProvidedException(CustomException):
    USER_FACING_MESSAGE = 'All information needed to create a new user was not' \
                          ' provided!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class UpdatingUserToExistingEmailException(CustomException):
    USER_FACING_MESSAGE = 'Sorry! Another user already has this email!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class DataForNewEncounterNotProvidedException(CustomException):
    USER_FACING_MESSAGE = 'All information needed to create encounter was not provided!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class DataNotProvided(CustomException):
    USER_FACING_MESSAGE = 'All information needed to create object was not provided!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE


class ObjectDoesNotExist(CustomException):
    USER_FACING_MESSAGE = 'That object does not exist!'

    def __init__(self, message=None):
        super().__init__(message)

    def get_user_facing_message(self):
        return self.USER_FACING_MESSAGE
