"""Utility functions for logging."""
import datetime
import logging
import os
import sys
from typing import Tuple

LOG_DIRECTORY = 'logs'
LOG_FILE_EXTENSION = 'log'


def get_log_filename(current_time: datetime.datetime) -> str:
    """Returns the filename to which logs should be written for this run.

    The filename will be based on the time of the run.
    """
    current_time_as_string: str = current_time.__str__()
    symbols_to_replace: Tuple[str, ...] = ('-', ':', ' ', '.')
    symbol: str
    for symbol in symbols_to_replace:
        current_time_as_string = current_time_as_string.replace(symbol, '_')

    filename: str = '{}.{}'.format(current_time_as_string, LOG_FILE_EXTENSION)
    return filename


def initialize_logging() -> None:
    """Initializes logging for the project."""
    if 'test' not in sys.argv:
        log_filename = get_log_filename(current_time=datetime.datetime.now())
        log_path = os.path.join(LOG_DIRECTORY, log_filename)

        if not os.path.exists(path=LOG_DIRECTORY):
            os.makedirs(LOG_DIRECTORY)
        logging.basicConfig(filename=log_path,
                            filemode='w',
                            level=logging.INFO)
    else:
        # Disable debug/info logging during tests.
        logging.disable(logging.CRITICAL)
