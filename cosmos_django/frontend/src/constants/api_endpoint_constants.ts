/* API endpoint constants. */
import * as baseUrlConstants from './base_url_constant';

export const STATIC = baseUrlConstants.BASE_URL + '/static/frontend/';
export const API_URL = baseUrlConstants.BASE_URL + '/main/api/';

// Static endpoints
export const TEXT = STATIC + 'images/logos/text_800_220.png';
export const LOGO_TEXT = STATIC + 'images/logos/logo_text_800x200.png';
export const PANEL_PLACEHOLDER = STATIC + 'images/panel_placeholder.jpeg';

// Token endpoints
export const GET_TOKEN = 'token/';
export const REFRESH_TOKEN = 'token/refresh/';

// Model endpoints
export const USERS = 'users/';
export const ENCOUNTERS = 'encounters/';
export const DIAGNOSES = 'diagnoses/';
export const MEDICATIONS = 'medications/';
export const ALLERGIES = 'allergies/';
export const VACCINATIONS = 'vaccinations/';

// Search endpoints
export const SEARCH = 'search';
