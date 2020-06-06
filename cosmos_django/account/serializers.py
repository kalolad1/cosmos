from rest_framework import serializers

from . import models


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account = models.Account.objects.create_user(
            validated_data['email'], validated_data['password'])
        return account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ('id', 'email')
