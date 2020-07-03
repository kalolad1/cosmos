/*
 * Payloads send by server will be in snake_case and converted to camelCase by
 * middleware before reaching the client. The client will send payloads in
 * camelCase, which will be converted to snake_case by middleware before they
 * reach API endpoints.
 *
 * tldr; When on server, expect snake_case everywhere, when on client, expect
 * camelCase everywhere.
 * */
export interface User {
    email: string;
    patientProfile: PatientProfile;
}

export interface PatientProfile {
    account: number;
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: string;
    age: number;
    profilePicture: string;
    phoneNumber: string;
    race: string;
    ethnicity: string;
    religion: string;
    insurance: string;
    pharmacy: string;
    address: Address;
    encounters: Array<Encounter>;
    diagnoses: Array<Diagnosis>;
    medications: Array<Medication>;
    vaccinations: Array<Vaccination>;
}

export interface Address {
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Encounter {
    id: number;
    patientProfile: number;
    note: string;
    encounterType: string;
    createdAt: string;
    updatedAt: string;
    significanceBand: string;
}

export interface Diagnosis {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface Medication {
    id: number;
    patientProfile: number;
    name: string;
}

export interface Vaccination {
    id: number;
    patientProfile: number;
    name: string;
}
