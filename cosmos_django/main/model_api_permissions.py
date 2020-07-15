"""Defines permissions for API endpoints."""
from rest_framework import permissions
from rest_framework.request import Request

from .util import api_util


class UsersPermissions(permissions.BasePermission):
    def has_permission(self, request: Request, view=None) -> bool:
        # If creating new main, allow permission without authentication.
        if request.method == api_util.HTTPMethod.POST.name:
            return True
        # If accessing main, require authentication.
        elif request.method == api_util.HTTPMethod.GET.name:
            if hasattr(request, 'context'):
                # Only let user from access their own accounts if id in url.
                user_id = request.context['kwargs']['user_id']
                if request.user and user_id == request.user.id:
                    return True
            if request.user and request.user.is_authenticated:
                return True

        # If updating, require authentication.
        elif request.method == api_util.HTTPMethod.PUT.name:
            if (hasattr(request, 'context') and request.user
                    and request.user.is_authenticated):
                user_id = request.context['kwargs']['user_id']
                if user_id == request.user.id:
                    return True
        return False


class EncountersPermissions(permissions.BasePermission):
    # TODO write tests for this.
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create a encounter.
        if request.method == api_util.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.PUT.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.DELETE.name:
            if request.user and request.user.is_authenticated:
                return True
        return False


class DiagnosesPermissions(permissions.BasePermission):
    # TODO write tests for this.
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create a diagnosis.
        if request.method == api_util.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.PUT.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.DELETE.name:
            if request.user and request.user.is_authenticated:
                return True
        return False


class MedicationsPermissions(permissions.BasePermission):
    # TODO write tests for this.
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create a medication.
        if request.method == api_util.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.PUT.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.DELETE.name:
            if request.user and request.user.is_authenticated:
                return True
        return False


class AllergiesPermissions(permissions.BasePermission):
    # TODO write tests for this.
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create an allergy.
        if request.method == api_util.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.PUT.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.DELETE.name:
            if request.user and request.user.is_authenticated:
                return True
        return False


class VaccinationsPermissions(permissions.BasePermission):
    # TODO write tests for this.
    def has_permission(self, request: Request, view=None) -> bool:
        # Require authentication to create an vaccination.
        if request.method == api_util.HTTPMethod.POST.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.PUT.name:
            if request.user and request.user.is_authenticated:
                return True
        if request.method == api_util.HTTPMethod.DELETE.name:
            if request.user and request.user.is_authenticated:
                return True
        return False
