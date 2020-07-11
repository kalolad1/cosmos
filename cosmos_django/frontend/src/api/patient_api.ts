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
export function addEncounter(newEncounter: modelTypes.EncounterConstructor) {
    /**
     * Adds an encounter.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.ENCOUNTERS, {
        ...newEncounter,
    });
}

export function updateEncounter(updatedEncounter: modelTypes.EncounterUpdate) {
    /**
     * Updates an encounter.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.ENCOUNTERS, {
        ...updatedEncounter,
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
export function addDiagnosis(newDiagnosis: modelTypes.DiagnosisConstructor) {
    /**
     * Adds a diagnosis.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.DIAGNOSES, {
        ...newDiagnosis,
    });
}

export function updateDiagnosis(updatedDiagnosis: modelTypes.DiagnosisUpdate) {
    /**
     * Updates a diagnosis.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.DIAGNOSES, {
        ...updatedDiagnosis,
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
export function addMedication(newMedication: modelTypes.MedicationConstructor) {
    /**
     * Adds a medication.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.MEDICATIONS, {
        ...newMedication,
    });
}

export function updateMedication(
    updatedMedication: modelTypes.MedicationUpdate
) {
    /**
     * Updates a medication.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.MEDICATIONS, {
        ...updatedMedication,
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

export function updateAllergy(updatedAllergy: modelTypes.AllergyUpdate) {
    /**
     * Updates an allergy.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.ALLERGIES, {
        ...updatedAllergy,
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
export function addVaccination(
    newVaccination: modelTypes.VaccinationConstructor
) {
    /**
     * Adds a vaccination.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.VACCINATIONS, {
        ...newVaccination,
    });
}

export function updateVaccination(
    updatedVaccination: modelTypes.VaccinationUpdate
) {
    /**
     * Updates an vaccination.
     */
    return axiosConfig.axiosClient.put(apiEndpointConstants.VACCINATIONS, {
        ...updatedVaccination,
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
