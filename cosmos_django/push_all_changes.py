import subprocess
import sys
from typing import Tuple

COMMANDS: Tuple[str, ...] = (
    'python manage.py collectstatic --noinput',
    'python manage.py makemigrations',
    'python manage.py migrate',
    'npm run dev',
    'pip freeze > requirements.txt',
    'yapf . --recursive -i',
    'mypy .',
    'python manage.py test -p *_test.py',
    'git add -A',
    'git commit -m {}'.format(sys.argv[1]),
    # 'git push',
)


def run_script() -> None:
    command: str
    for command in COMMANDS:
        subprocess.run(command.split())


if __name__ == '__main__':
    run_script()
