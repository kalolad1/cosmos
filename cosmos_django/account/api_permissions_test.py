from django import test


class TestAccountsPermissions(test.TestCase):
    def test_create_new_account_succeeds(self):
        pass

    def test_get_account_fails_no_authentication(self):
        pass

    def test_get_account_succeeds(self):
        pass

    def test_unauthorized_http_method(self):
        pass
