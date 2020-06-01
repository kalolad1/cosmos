from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.test import Client, TestCase
from django.urls import reverse

from . import models
from . import views
from clinical import models as clinical_models


class TestViews(TestCase):
    def test_signin_page_load(self):
        client: Client = Client()
        path = reverse(viewname='account/signin')
        response: HttpResponse = client.get(path=path)
        self.assertEqual(response.status_code, 200)

    def test_signin_success(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        request: HttpRequest = HttpRequest()
        request.method = 'POST'
        request.POST = {'email': 'test@gmail.com', 'password': '1234'}
        request.session = self.client.session

        response: HttpResponseRedirect = views.signin(request=request)
        self.assertEqual(response.status_code, 302)

    def test_signin_incorrect_credentials(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        request: HttpRequest = HttpRequest()
        request.method = 'POST'
        request.POST = {'email': 'test@gmail.com', 'password': '12234'}
        request.session = self.client.session

        response: HttpResponse = views.signin(request=request)

        self.assertEqual(response.status_code, 200)

    def test_signup_page_load(self):
        client: Client = Client()
        path = reverse(viewname='account/signup')
        response: HttpResponse = client.get(path=path)
        self.assertEqual(response.status_code, 200)

    def test_signup_success_is_provider(self):
        request: HttpRequest = HttpRequest()
        request.method = 'POST'
        request.POST = {
            'email': 'test@gmail.com',
            'password': '1234',
            'password-check': '1234',
            'first-name': 'John',
            'last-name': 'Doe',
            'is-provider': 'on'
        }
        request.session = self.client.session

        response: HttpResponseRedirect = views.signup(request=request)

        user: models.Account = models.Account.objects.get(
            email='test@gmail.com')
        self.assertEqual(user.email, 'test@gmail.com')
        self.assertTrue(user.check_password(raw_password='1234'))
        self.assertEqual(response.status_code, 302)

    def test_signup_sucess_is_patient(self):
        request: HttpRequest = HttpRequest()
        request.method = 'POST'
        request.POST = {
            'email': 'test@gmail.com',
            'password': '1234',
            'password-check': '1234',
            'first-name': 'John',
            'last-name': 'Doe'
        }
        request.session = self.client.session

        response: HttpResponseRedirect = views.signup(request=request)

        user: models.Account = models.Account.objects.get(
            email='test@gmail.com')
        self.assertEqual(user.email, 'test@gmail.com')
        self.assertTrue(user.check_password(raw_password='1234'))
        self.assertEqual(user.patient_profile.first_name, 'John')
        self.assertEqual(user.patient_profile.last_name, 'Doe')
        self.assertEqual(response.status_code, 302)

    #
    # def test_signup_password_check_incorrect(self):
    #     pass
    #
    # def test_signup_user_already_exists(self):
    #     pass
    #
    #
    # def test_logout(self):
    #     pass
