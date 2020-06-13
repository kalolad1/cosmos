import datetime

from django import test

from . import logging_util


class TestLoggingUtil(test.TestCase):
    def test_get_log_filename(self):
        time_at_server_run: datetime.datetime = datetime.datetime(
            year=2012,
            month=5,
            day=3,
            hour=2,
            minute=56,
            second=20,
            microsecond=3343)

        filename: str = logging_util.get_log_filename(
            current_time=time_at_server_run)

        expected_filename: str = '2012_05_03_02_56_20_003343.log'
        self.assertEqual(filename, expected_filename)
