from rest_framework import permissions
from rest_framework.request import Request

from . import api


class SearchPermissions(permissions.BasePermission):
    def has_permission(self, request: Request, view=None) -> bool:
        if request.method == api.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        return False
