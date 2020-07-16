//@ts-nocheck
import * as patientApi from './patient_api';
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosMockUtil from '../fixtures/axiosMockUtil';
import * as modelTypes from '../types/modelTypes';

describe('User API', () => {
    test('get user', () => {
        const expectedResponse = {
            data: {
                user: {
                    email: 'test@gmail.com',
                },
            },
        };
        const mockClient = axiosMockUtil.getMockClient('get', expectedResponse);
        const clientParams = [apiEndpointConstants.USERS];
        return (
            patientApi
                // @ts-ignore
                .getUser(mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.get).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('get user with id', () => {
        const expectedResponse = {
            data: {
                user: {
                    email: 'test@gmail.com',
                },
            },
        };
        const mockClient = axiosMockUtil.getMockClient('get', expectedResponse);
        const id = '0';
        const clientParams = [apiEndpointConstants.USERS + id + '/'];
        return (
            patientApi
                // @ts-ignore
                .getUserWithId(id, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.get).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('update user', () => {
        const expectedResponse = {
            data: {
                user: {
                    email: 'test@gmail.com',
                },
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedUser: modelTypes.UserUpdate = {
            id: 4,
            email: '123@gmail.com',
            patientProfile: undefined,
            providerProfile: undefined,
        };
        const clientParams = [
            apiEndpointConstants.USERS + updatedUser.id + '/',
            updatedUser,
        ];
        return (
            patientApi
                // @ts-ignore
                .updateUser(updatedUser, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});

describe('Encounter API', () => {
    test('add encounter', () => {
        const expectedResponse = {
            data: {
                note: 'test',
                encounterType: modelTypes.EncounterType.PHYSICAL,
            },
        };
        const mockClient = axiosMockUtil.getMockClient(
            'post',
            expectedResponse
        );
        const newEncounter: modelTypes.EncounterConstructor = {
            note: 'test',
            encounterType: modelTypes.EncounterType.PHYSICAL,
        };
        const clientParams = [apiEndpointConstants.ENCOUNTERS, newEncounter];
        return (
            patientApi
                // @ts-ignore
                .addEncounter(newEncounter, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.post).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('update encounter', () => {
        const expectedResponse = {
            data: {
                note: 'test',
                description: 'test description',
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedEncounter: modelTypes.EncounterUpdate = {
            id: 1,
            note: 'test',
            encounterType: modelTypes.EncounterType.PHYSICAL,
        };
        const clientParams = [
            apiEndpointConstants.ENCOUNTERS,
            updatedEncounter,
        ];
        return (
            patientApi
                // @ts-ignore
                .updateEncounter(updatedEncounter, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('delete encounter', () => {
        const expectedResponse = {
            data: {},
        };
        const mockClient = axiosMockUtil.getMockClient(
            'delete',
            expectedResponse
        );
        const deleteId = 1;
        const clientParams = [
            apiEndpointConstants.ENCOUNTERS,
            {
                data: {
                    id: deleteId,
                },
            },
        ];
        return (
            patientApi
                // @ts-ignore
                .deleteEncounter(deleteId, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.delete).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});

describe('Diagnosis API', () => {
    test('add diagnosis', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient(
            'post',
            expectedResponse
        );
        const newDiagnosis: modelTypes.DiagnosisConstructor = {
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [apiEndpointConstants.DIAGNOSES, newDiagnosis];
        return patientApi
            .addDiagnosis(newDiagnosis, mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                expect(mockClient.post).toHaveBeenCalledWith(...clientParams);
            });
    });

    test('update diagnosis', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedDiagnosis: modelTypes.DiagnosisUpdate = {
            id: 1,
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [apiEndpointConstants.DIAGNOSES, updatedDiagnosis];
        return (
            patientApi
                // @ts-ignore
                .updateDiagnosis(updatedDiagnosis, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('delete diagnosis', () => {
        const expectedResponse = {
            data: {},
        };
        const mockClient = axiosMockUtil.getMockClient(
            'delete',
            expectedResponse
        );
        const deleteId = 1;
        const clientParams = [
            apiEndpointConstants.DIAGNOSES,
            {
                data: {
                    id: deleteId,
                },
            },
        ];
        return (
            patientApi
                // @ts-ignore
                .deleteDiagnosis(deleteId, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.delete).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});

describe('Medication API', () => {
    test('add medication', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient(
            'post',
            expectedResponse
        );
        const newMedication: modelTypes.MedicationConstructor = {
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [apiEndpointConstants.MEDICATIONS, newMedication];
        return patientApi
            .addMedication(newMedication, mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                expect(mockClient.post).toHaveBeenCalledWith(...clientParams);
            });
    });

    test('update medication', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedMedication: modelTypes.MedicationUpdate = {
            id: 1,
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [
            apiEndpointConstants.MEDICATIONS,
            updatedMedication,
        ];
        return (
            patientApi
                // @ts-ignore
                .updateMedication(updatedMedication, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('delete medication', () => {
        const expectedResponse = {
            data: {},
        };
        const mockClient = axiosMockUtil.getMockClient(
            'delete',
            expectedResponse
        );
        const deleteId = 1;
        const clientParams = [
            apiEndpointConstants.MEDICATIONS,
            {
                data: {
                    id: deleteId,
                },
            },
        ];
        return (
            patientApi
                // @ts-ignore
                .deleteMedication(deleteId, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.delete).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});

describe('Allergy API', () => {
    test('add allergy', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient(
            'post',
            expectedResponse
        );
        const newAllergy: modelTypes.AllergyConstructor = {
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [apiEndpointConstants.ALLERGIES, newAllergy];
        return patientApi
            .addAllergy(newAllergy, mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                expect(mockClient.post).toHaveBeenCalledWith(...clientParams);
            });
    });

    test('update allergy', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedAllergy: modelTypes.AllergyUpdate = {
            id: 1,
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [apiEndpointConstants.ALLERGIES, updatedAllergy];
        return (
            patientApi
                // @ts-ignore
                .updateAllergy(updatedAllergy, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('delete allergy', () => {
        const expectedResponse = {
            data: {},
        };
        const mockClient = axiosMockUtil.getMockClient(
            'delete',
            expectedResponse
        );
        const deleteId = 1;
        const clientParams = [
            apiEndpointConstants.ALLERGIES,
            {
                data: {
                    id: deleteId,
                },
            },
        ];
        return (
            patientApi
                // @ts-ignore
                .deleteAllergy(deleteId, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.delete).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});

describe('Vaccination API', () => {
    test('add vaccination', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient(
            'post',
            expectedResponse
        );
        const newVaccination: modelTypes.VaccinationConstructor = {
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [
            apiEndpointConstants.VACCINATIONS,
            newVaccination,
        ];
        return patientApi
            .addVaccination(newVaccination, mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                expect(mockClient.post).toHaveBeenCalledWith(...clientParams);
            });
    });

    test('update vaccination', () => {
        const expectedResponse = {
            data: {
                name: 'Something',
                description: 'Something',
            },
        };
        const mockClient = axiosMockUtil.getMockClient('put', expectedResponse);
        const updatedVaccination: modelTypes.VaccinationUpdate = {
            id: 1,
            name: 'Something',
            description: 'Something',
        };
        const clientParams = [
            apiEndpointConstants.VACCINATIONS,
            updatedVaccination,
        ];
        return (
            patientApi
                // @ts-ignore
                .updateVaccination(updatedVaccination, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.put).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });

    test('delete vaccination', () => {
        const expectedResponse = {
            data: {},
        };
        const mockClient = axiosMockUtil.getMockClient(
            'delete',
            expectedResponse
        );
        const deleteId = 1;
        const clientParams = [
            apiEndpointConstants.VACCINATIONS,
            {
                data: {
                    id: deleteId,
                },
            },
        ];
        return (
            patientApi
                // @ts-ignore
                .deleteVaccination(deleteId, mockClient)
                .then(function (response) {
                    expect(response).toEqual(expectedResponse);
                    expect(mockClient.delete).toHaveBeenCalledWith(
                        ...clientParams
                    );
                })
        );
    });
});
