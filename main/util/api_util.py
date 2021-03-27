import enum


class HTTPMethod(enum.Enum):
    """Defines HTTP method constants."""
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'
    DELETE = 'DELETE'
