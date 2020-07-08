import * as axiosConfig from '../configs/axios_config';
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as tokenConstants from '../constants/token_constants';
import * as urlPathConstants from '../constants/url_path_constants';
import * as types from '../types/types';
import * as authUtil from '../util/auth_util';


async function getFreshTokensOrRedirectToLogin(history) {
    // Checks for fresh access token. If not, it tries to refresh it. If the
    // refresh token is expired, then it redirects to login.

    // Check for fresh access token.
    const currentTimeInMillisecond = new Date().getTime();
    if (currentTimeInMillisecond < authUtil.getTokenExpiry(tokenConstants.ACCESS_TOKEN)) {
        return true;
    }
    // Check for fresh refresh token.
    if (currentTimeInMillisecond < authUtil.getTokenExpiry(tokenConstants.REFRESH_TOKEN)) {
        const accessTokenResponse = await authUtil.refreshAccessToken();
        authUtil.setToken(
            tokenConstants.ACCESS_TOKEN,
            accessTokenResponse.data.access
        );
        return true;
    }

    // Both tokens have expired, clear tokens and return to login.
    authUtil.clearTokens();
    history.replace(urlPathConstants.LOGIN);
    return false;
}

async function makeAuthorizedRequestOrRedirectToLogin(request, history) {
    /**
     * Attempts an asynchronous server request and redirects to login if fails.
     */
    try {
        return await request();
    } catch (error) {
        try {
            const accessTokenResponse = await authUtil.refreshAccessToken();
            authUtil.setToken(
                tokenConstants.ACCESS_TOKEN,
                accessTokenResponse.data.access
            );
            return await request();
        } catch (error) {
            authUtil.clearTokens();
            history.replace(urlPathConstants.ROOT);
        }
    }
    return null;
}

/* User */
export function getUser(history: any) {
    /**
     * Fetches user from the server.
     */
    function request() {
        return axiosConfig.axiosClient.get(
            apiEndpointConstants.USERS,
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export async function updateUser(user: types.User, history: any) {
    /**
     * Updates the user with the new user object.
     */

    await getFreshTokensOrRedirectToLogin(history);
    return axiosConfig.axiosClient.put(
        apiEndpointConstants.USERS,
        {...user},
        authUtil.getAuthorizationRequestHeader());

}

/* Encounter */
export function addEncounter(
    encounterType: string,
    note: string,
    history: any
) {
    /**
     * Adds an encounter.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.ENCOUNTERS,
            {
                encounterType: encounterType,
                note: note,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateEncounter(
    id: number,
    encounterType: string,
    note: string,
    history: any
) {
    /**
     * Updates an encounter.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.ENCOUNTERS,
            {
                id: id,
                encounterType: encounterType,
                note: note,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function deleteEncounter(id: number, history: any) {
    /**
     * Deletes an encounter.
     */
    function request() {
        return axiosConfig.axiosClient.delete(apiEndpointConstants.ENCOUNTERS, {
            data: {
                id: id,
            },
            ...authUtil.getAuthorizationRequestHeader(),
        });
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

/* Diagnosis */
export function addDiagnosis(name: string, description: string, history: any) {
    /**
     * Adds a diagnosis.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.DIAGNOSES,
            {
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateDiagnosis(
    id: number,
    name: string,
    description: string,
    history: any
) {
    /**
     * Updates a diagnosis.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.DIAGNOSES,
            {
                id: id,
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function deleteDiagnosis(id: number, history: any) {
    /**
     * Deletes a diagnosis.
     */
    function request() {
        return axiosConfig.axiosClient.delete(apiEndpointConstants.DIAGNOSES, {
            data: {
                id: id,
            },
            ...authUtil.getAuthorizationRequestHeader(),
        });
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

/* Medication */
export function addMedication(name: string, description: string, history: any) {
    /**
     * Adds a medication.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.MEDICATIONS,
            {
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateMedication(
    id: number,
    name: string,
    description: string,
    history: any
) {
    /**
     * Updates a medication.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.MEDICATIONS,
            {
                id: id,
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function deleteMedication(id: number, history: any) {
    /**
     * Deletes a medication.
     */
    function request() {
        return axiosConfig.axiosClient.delete(
            apiEndpointConstants.MEDICATIONS,
            {
                data: {
                    id: id,
                },
                ...authUtil.getAuthorizationRequestHeader(),
            }
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

/* Allergy */
export function addAllergy(name: string, description: string, history: any) {
    /**
     * Adds an allergy.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.ALLERGIES,
            {
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateAllergy(
    id: number,
    name: string,
    description: string,
    history: any
) {
    /**
     * Updates an allergy.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.ALLERGIES,
            {
                id: id,
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function deleteAllergy(id: number, history: any) {
    /**
     * Deletes an allergy.
     */
    function request() {
        return axiosConfig.axiosClient.delete(apiEndpointConstants.ALLERGIES, {
            data: {
                id: id,
            },
            ...authUtil.getAuthorizationRequestHeader(),
        });
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

/* Vaccination */
export function addVaccination(
    name: string,
    description: string,
    history: any
) {
    /**
     * Adds a vaccination.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.VACCINATIONS,
            {
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateVaccination(
    id: number,
    name: string,
    description: string,
    history: any
) {
    /**
     * Updates an vaccination.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.VACCINATIONS,
            {
                id: id,
                name: name,
                description: description,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function deleteVaccination(id: number, history: any) {
    /**
     * Deletes an vaccination.
     */
    function request() {
        return axiosConfig.axiosClient.delete(
            apiEndpointConstants.VACCINATIONS,
            {
                data: {
                    id: id,
                },
                ...authUtil.getAuthorizationRequestHeader(),
            }
        );
    }

    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}
