"""API for search."""
# pylint: disable=R0201
from rest_framework.request import Request
from rest_framework import response
from rest_framework import status
from rest_framework import views

from . import search_permissions
from .util import search_util


class SearchEndpoint(views.APIView):
    """Endpoint for search."""
    permission_classes = (search_permissions.SearchPermissions, )

    def post(self, request: Request) -> response.Response:
        """Returns search results"""
        query: str = request.query_params['q']
        results = search_util.get_search_results(query, request.user)
        serialized_results = search_util.serialize_results(results)
        return response.Response(data=serialized_results,
                                 status=status.HTTP_200_OK)
