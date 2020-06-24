"""Defines permissions for API endpoints."""
from rest_framework import permissions
from rest_framework.request import Request

from . import api


class UsersPermissions(permissions.BasePermission):
    def has_permission(self, request: Request, view=None) -> bool:
        # If creating new main, allow permission without authentication.
        if request.method == api.HTTPMethod.POST:
            return True
        # If accessing main, require authentication.
        elif request.method == api.HTTPMethod.GET:
            if request.user and request.user.is_authenticated:
                return True
        return False


class EncountersPermissions(permissions.BasePermission):
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create a encounter.
        if request.method == api.HTTPMethod.POST:
            if request.user and request.user.is_authenticated:
                return True
        return False
