import subprocess

from django.test import TestCase


class TestProject(TestCase):
    def test_type_checking(self):
        pr = subprocess.Popen('mypy .'.split(),
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)

        out, _ = pr.communicate()

        if pr.returncode != 0:
            print('\n\n{}\n\n'.format(out.decode("utf-8")))
            self.fail('Type checking errors.')
