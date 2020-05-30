from django.test import Client, TestCase
from django.urls import reverse


class TestClinicalViews(TestCase):
    def test_home(self):
        client = Client()
        response = client.get(reverse('clinical/home'))
        self.assertEqual(response.status_code, 302)
