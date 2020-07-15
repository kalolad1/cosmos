from typing import Dict

from . import models

TEST_USER_REQUEST_DATA = {
    'email': 'test123@gmail.com',
    'password': 'test1234',
    'date_of_birth': "2017-06-27T20:48:49.065Z",
    'first_name': 'John',
    'last_name': 'Doe',
    'sex': 'male',
    'is_provider': False,
}

TEST_USER_PUT_REQUEST_DATA = {
    'email': 'another@gmail.com',
    'patient_profile': {
        'first_name': 'Billy',
        'date_of_birth': '2000-06-27T20:48:49.065Z',
        'phone_number': '18564985939',
        'address': {
            'address_line': '1600 Penn Ave',
            'city': 'Washington DC',
            'state': 'Maryland',
            'zip_code': '00600',
        },
        'race': 'white',
        'ethnicity': 'indian',
        'religion': 'Hindu',
        'insurance': 'Aetna',
        'pharmacy': 'Walgreens',
    }
}

TEST_ENCOUNTER_REQUEST_DATA = {
    'encounter_type': 'physical',
    'note': 'This is a test physician note.',
    'significance_band': 'low',
}


def _create_test_user(json_data: Dict[str, object] = None) -> models.User:
    user_data: Dict[str, object]
    if json_data:
        user_data = json_data
    else:
        user_data = TEST_USER_REQUEST_DATA
    return models.User.objects.create_user_from_json(user_data)
