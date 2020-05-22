from django.test import TestCase

from django.contrib import auth
from . import models


class AuthTestCase(TestCase):
    def setUp(self):
        self.super_user = models.Account.objects.create_user(
            email='test@gmail.com', password='test')
        self.super_user.save()

    def testLogin(self):
        self.client.login(username='test@gmail.com', password='test')
