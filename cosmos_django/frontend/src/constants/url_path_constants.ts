/* Contains URL paths for the project */
export const HOME = '/home';
export const LOGIN = '/login';
export const SIGNUP = '/signup';

// Application pages
// Patient Specific
export const CHARTS = HOME + '/charts';

// Provider Specific
export const SEARCH_RESULTS = HOME + '/search';
export const VIEW_PATIENT = '/patient/:id';

// Shared
export const SCHEDULE = HOME + '/schedule';
export const INBOX = HOME + '/inbox';
export const METRICS = HOME + '/metrics';

// Patient charts.
export const SUMMARY = CHARTS + '/summary';
export const TIMELINE = CHARTS + '/timeline';
export const PROFILE = CHARTS + '/profile';

export const NEW_ENCOUNTER = '/encounter/new';
export const VIEW_ENCOUNTER = '/encounter/:id';
export const UPDATE_ENCOUNTER = '/encounter/:id/update';

export const NEW_DIAGNOSIS = '/diagnosis/new';
export const VIEW_DIAGNOSIS = '/diagnosis/:id';
export const UPDATE_DIAGNOSIS = '/diagnosis/:id/update';

export const NEW_MEDICATION = '/medication/new';
export const VIEW_MEDICATION = '/medication/:id';
export const UPDATE_MEDICATION = '/medication/:id/update';

export const NEW_ALLERGY = '/allergy/new';
export const VIEW_ALLERGY = '/allergy/:id';
export const UPDATE_ALLERGY = '/allergy/:id/update';

export const NEW_VACCINATION = '/vaccination/new';
export const VIEW_VACCINATION = '/vaccination/:id';
export const UPDATE_VACCINATION = '/vaccination/:id/update';
