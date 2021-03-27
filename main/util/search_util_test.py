import copy
from typing import Dict

from django.db.models import QuerySet
from django import test

from . import search_util
from .. import models
from .. import test_fixtures


class TestSearchUtil(test.TestCase):
    def test_search_util_empty_query(self):
        user: models.User = test_fixtures._create_test_user()
        results: QuerySet = search_util.get_search_results('', user)
        self.assertEqual(results.count(), 0)

    def test_search_util_ranked_query(self):
        user: models.User = test_fixtures._create_test_user()

        # Make 4 deep copies of users from text fixture method.
        request_1: Dict[str, str] = copy.deepcopy(
            test_fixtures.TEST_USER_REQUEST_DATA)
        request_1['email'] = 'one@gmail.com'
        request_1['first_name'] = 'George'
        request_1['last_name'] = 'Washington'
        request_2: Dict[str, str] = copy.deepcopy(
            test_fixtures.TEST_USER_REQUEST_DATA)
        request_2['email'] = 'two@gmail.com'
        request_2['first_name'] = 'Thomas'
        request_2['last_name'] = 'Jefferson'
        request_3: Dict[str, str] = copy.deepcopy(
            test_fixtures.TEST_USER_REQUEST_DATA)
        request_3['email'] = 'three@gmail.com'
        request_3['first_name'] = 'Abraham'
        request_3['last_name'] = 'Lincoln'
        request_4: Dict[str, str] = copy.deepcopy(
            test_fixtures.TEST_USER_REQUEST_DATA)
        request_4['email'] = 'four@gmail.com'
        request_4['first_name'] = 'Theodore'
        request_4['last_name'] = 'Roosevelt'

        test_user_1 = test_fixtures._create_test_user(request_1)
        test_user_2 = test_fixtures._create_test_user(request_2)
        test_user_3 = test_fixtures._create_test_user(request_3)
        test_user_4 = test_fixtures._create_test_user(request_4)

        # Submit a query and ensure proper order and existence.
        result_1: QuerySet = search_util.get_search_results(query='Theodor',
                                                            user=user)
        self.assertEqual(result_1.count(), 1)
        self.assertEqual(result_1[0], test_user_4)

        result_2: QuerySet = search_util.get_search_results(query='Lincoln',
                                                            user=user)
        self.assertEqual(result_2.count(), 1)
        self.assertEqual(result_2[0], test_user_3)
