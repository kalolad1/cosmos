import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from '../configs/axios_config';
import * as modelTypes from '../types/modelTypes';

/* User */
export function getUser() {
    /**
     * Fetches user from the server.
     */
    return axiosConfig.axiosClient.get(apiEndpointConstants.USERS);
}

export async function updateUser(user: modelTypes.User) {
    /**
     * Updates the user with the new user object.
     */

    return axiosConfig.axiosClient.put(
        apiEndpointConstants.USERS + user.id.toString() + '/',
        { ...user }
    );
}

/* Encounter */
export function addEncounter(encounterType: string, note: string) {
    /**
     * Adds an encounter.
     */

    return axiosConfig.axiosClient.post(apiEndpointConstants.ENCOUNTERS, {
        encounterType: encounterType,
        note: note,
    });
}

export function updateEncounter(
    id: number,
    encounterType: string,
    note: string
) {
    /**
     * Updates an encounter.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.ENCOUNTERS, {
        id: id,
        encounterType: encounterType,
        note: note,
    });
}

export function deleteEncounter(id: number) {
    /**
     * Deletes an encounter.
     */
    return axiosConfig.axiosClient.delete(apiEndpointConstants.ENCOUNTERS, {
        data: {
            id: id,
        },
    });
}

/* Diagnosis */
export function addDiagnosis(name: string, description: string) {
    /**
     * Adds a diagnosis.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.DIAGNOSES, {
        name: name,
        description: description,
    });
}

export function updateDiagnosis(id: number, name: string, description: string) {
    /**
     * Updates a diagnosis.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.DIAGNOSES, {
        id: id,
        name: name,
        description: description,
    });
}

export function deleteDiagnosis(id: number) {
    /**
     * Deletes a diagnosis.
     */
    return axiosConfig.axiosClient.delete(apiEndpointConstants.DIAGNOSES, {
        data: {
            id: id,
        },
    });
}

/* Medication */
export function addMedication(name: string, description: string) {
    /**
     * Adds a medication.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.MEDICATIONS, {
        name: name,
        description: description,
    });
}

export function updateMedication(
    id: number,
    name: string,
    description: string
) {
    /**
     * Updates a medication.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.MEDICATIONS, {
        id: id,
        name: name,
        description: description,
    });
}

export function deleteMedication(id: number) {
    /**
     * Deletes a medication.
     */
    return axiosConfig.axiosClient.delete(apiEndpointConstants.MEDICATIONS, {
        data: {
            id: id,
        },
    });
}

/* Allergy */
export function addAllergy(newAllergy: modelTypes.AllergyConstructor) {
    /**
     * Adds an allergy.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.ALLERGIES, {
        ...newAllergy,
    });
}

export function updateAllergy(updatedAllergy: modelTypes.AllergyUpdater) {
    /**
     * Updates an allergy.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.ALLERGIES, {
        id: updatedAllergy.id,
        name: updatedAllergy.name,
        description: updatedAllergy.description,
    });
}

export function deleteAllergy(id: number) {
    /**
     * Deletes an allergy.
     */
    return axiosConfig.axiosClient.delete(apiEndpointConstants.ALLERGIES, {
        data: {
            id: id,
        },
    });
}

/* Vaccination */
export function addVaccination(name: string, description: string) {
    /**
     * Adds a vaccination.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.VACCINATIONS, {
        name: name,
        description: description,
    });
}

export function updateVaccination(
    id: number,
    name: string,
    description: string
) {
    /**
     * Updates an vaccination.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.VACCINATIONS, {
        id: id,
        name: name,
        description: description,
    });
}

export function deleteVaccination(id: number) {
    /**
     * Deletes an vaccination.
     */
    return axiosConfig.axiosClient.delete(apiEndpointConstants.VACCINATIONS, {
        data: {
            id: id,
        },
    });
}
