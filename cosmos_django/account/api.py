from knox.models import AuthToken
from rest_framework import generics
from rest_framework.response import Response

from . import models
from . import serializers


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = serializers.CreateAccountSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user":
            serializers.AccountSerializer(
                user, context=self.get_serializer_context()).data,
            "token":
            AuthToken.objects.create(user)[1]
        })
