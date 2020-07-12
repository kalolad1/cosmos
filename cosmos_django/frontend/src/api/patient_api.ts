import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from '../configs/axios_config';
import * as modelTypes from '../types/modelTypes';

/* User */
/**
 * Gets the user from the server.
 *
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function getUser(client = axiosConfig.axiosClient) {
    return client.get(apiEndpointConstants.USERS);
}

/**
 * Updates the user with new data.
 *
 * @param updatedUser - The updated user.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateUser(
    updatedUser: modelTypes.UserUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(
        apiEndpointConstants.USERS + updatedUser.id.toString() + '/',
        { ...updatedUser }
    );
}

/* Encounter */
/**
 * Adds an encounter for the current user.
 *
 * @param newEncounter - The new encounter to be added.
 * @param client - Axios instance used to make request.
 *
 *
 * @returns A Promise containing the server response.
 */
export function addEncounter(
    newEncounter: modelTypes.EncounterConstructor,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.ENCOUNTERS, {
        ...newEncounter,
    });
}

/**
 * Updates an encounter for the current user.
 *
 * @param updatedEncounter - The updated encounter.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateEncounter(
    updatedEncounter: modelTypes.EncounterUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(apiEndpointConstants.ENCOUNTERS, {
        ...updatedEncounter,
    });
}

/**
 * Deletes an encounter for the current user.
 *
 * @param id - The id of the encounter to be deleted.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function deleteEncounter(id: number, client = axiosConfig.axiosClient) {
    return client.delete(apiEndpointConstants.ENCOUNTERS, {
        data: {
            id: id,
        },
    });
}

/* Diagnosis */
/**
 * Adds an diagnosis for the current user.
 *
 * @param newDiagnosis - The new diagnosis to be added.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function addDiagnosis(
    newDiagnosis: modelTypes.DiagnosisConstructor,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.DIAGNOSES, {
        ...newDiagnosis,
    });
}

/**
 * Updates a diagnosis for the current user.
 *
 * @param updatedDiagnosis - The updated diagnosis.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateDiagnosis(
    updatedDiagnosis: modelTypes.DiagnosisUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(apiEndpointConstants.DIAGNOSES, {
        ...updatedDiagnosis,
    });
}

/**
 * Deletes a diagnosis for the current user.
 *
 * @param id - The id of the diagnosis to be deleted.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function deleteDiagnosis(id: number, client = axiosConfig.axiosClient) {
    return client.delete(apiEndpointConstants.DIAGNOSES, {
        data: {
            id: id,
        },
    });
}

/* Medication */
/**
 * Adds an medication for the current user.
 *
 * @param newMedication - The new medication to be added.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function addMedication(
    newMedication: modelTypes.MedicationConstructor,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.MEDICATIONS, {
        ...newMedication,
    });
}

/**
 * Updates a medication for the current user.
 *
 * @param updatedMedication - The updated medication.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateMedication(
    updatedMedication: modelTypes.MedicationUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(apiEndpointConstants.MEDICATIONS, {
        ...updatedMedication,
    });
}

/**
 * Deletes a medication for the current user.
 *
 * @param id - The id of the medication to be deleted.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function deleteMedication(id: number, client = axiosConfig.axiosClient) {
    return client.delete(apiEndpointConstants.MEDICATIONS, {
        data: {
            id: id,
        },
    });
}

/* Allergy */
/**
 * Adds an allergy for the current user.
 *
 * @param newAllergy - The new allergy to be added.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function addAllergy(
    newAllergy: modelTypes.AllergyConstructor,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.ALLERGIES, {
        ...newAllergy,
    });
}

/**
 * Updates an allergy for the current user.
 *
 * @param updatedAllergy - The updated allergy.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateAllergy(
    updatedAllergy: modelTypes.AllergyUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(apiEndpointConstants.ALLERGIES, {
        ...updatedAllergy,
    });
}

/**
 * Deletes a allergy for the current user.
 *
 * @param id - The id of the allergy to be deleted.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function deleteAllergy(id: number, client = axiosConfig.axiosClient) {
    return client.delete(apiEndpointConstants.ALLERGIES, {
        data: {
            id: id,
        },
    });
}

/* Vaccination */
/**
 * Adds a vaccination for the current user.
 *
 * @param newVaccination - The new vaccination to be added.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function addVaccination(
    newVaccination: modelTypes.VaccinationConstructor,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.VACCINATIONS, {
        ...newVaccination,
    });
}

/**
 * Updates an vaccination for the current user.
 *
 * @param updatedVaccination - The updated vaccination.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function updateVaccination(
    updatedVaccination: modelTypes.VaccinationUpdate,
    client = axiosConfig.axiosClient
) {
    return client.put(apiEndpointConstants.VACCINATIONS, {
        ...updatedVaccination,
    });
}

/**
 * Deletes a vaccination for the current user.
 *
 * @param id - The id of the vaccination to be deleted.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise containing the server response.
 */
export function deleteVaccination(
    id: number,
    client = axiosConfig.axiosClient
) {
    return client.delete(apiEndpointConstants.VACCINATIONS, {
        data: {
            id: id,
        },
    });
}
