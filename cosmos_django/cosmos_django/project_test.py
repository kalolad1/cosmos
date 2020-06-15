import subprocess

from django import test
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


class TestProject(test.TestCase):
    def test_type_checking(self):
        pr = subprocess.Popen('mypy .'.split(),
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)

        out, _ = pr.communicate()

        if pr.returncode != 0:
            print('\n\n{}\n\n'.format(out.decode("utf-8")))
            self.fail('Type checking errors.')


class LiveServerTests(test.LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(LiveServerTests, cls).setUpClass()
        cls.selenium = webdriver.Chrome(ChromeDriverManager().install())

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super(LiveServerTests, cls).tearDownClass()

    def test_landing_page(self):
        self.selenium.get(self.live_server_url)

    def test_app_homepage(self):
        self.selenium.get('{}{}'.format(self.live_server_url, '/app/'))
