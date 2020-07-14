"""API for search."""
# pylint: disable=R0201
from rest_framework.request import Request
from rest_framework import response
from rest_framework import status
from rest_framework import views

from . import search_permissions


class SearchEndpoint(views.APIView):
    """Endpoint for search."""
    permission_classes = (search_permissions.SearchPermissions, )

    def post(self, request: Request) -> response.Response:
        """Returns search results"""
        print(request.query_params)
        return response.Response(status=status.HTTP_200_OK)
