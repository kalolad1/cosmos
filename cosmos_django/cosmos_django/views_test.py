from django.test import Client, TestCase
from django.urls import reverse


class TestViews(TestCase):
    def test_landing_page(self):
        client = Client()
        response = client.get(reverse('cosmos_django/landing_page'))
        self.assertEqual(response.status_code, 200)
