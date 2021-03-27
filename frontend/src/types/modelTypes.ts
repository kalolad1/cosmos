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
    id: number;
    email: string;
    patientProfile?: PatientProfile;
    providerProfile?: ProviderProfile;
}

export interface UserUpdate {
    id: number;
    email: string;
    patientProfile?: PatientProfileUpdate;
    providerProfile?: ProviderProfileUpdate;
}

export interface UserConstructor {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: Sex;
    isProvider: boolean;
}

// Contains limited, unrestricted information.
export interface LimitedUser {
    email: string;
    id: string;
    patientProfile: LimitedPatientProfile;
}

export interface ProviderProfile {
    user: number;
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: Sex;
}

export interface ProviderProfileUpdate {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: Sex;
}

export interface PatientProfile {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: Sex;
    age: number;
    profilePicture: string;
    race: string;
    ethnicity: string;
    religion: string;
    insurance: string;
    pharmacy: string;
    address: Address;
    encounters: Array<Encounter>;
    diagnoses: Array<Diagnosis>;
    medications: Array<Medication>;
    allergies: Array<Allergy>;
    vaccinations: Array<Vaccination>;
}

export interface LimitedPatientProfile {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: Sex;
    age: number;
    profilePicture: string;
}

export interface PatientProfileUpdate {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    race: string;
    ethnicity: string;
    religion: string;
    insurance: string;
    pharmacy: string;
    address: Address;
}

export interface Address {
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
}

export enum Sex {
    EMPTY = '',
    MALE = 'male',
    FEMALE = 'female',
}

interface MedicalEntity {
    significanceScore: number;
    significanceGroup: SignificanceGroup;
}

export enum SignificanceGroup {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export interface Encounter extends MedicalEntity {
    id: number;
    patientProfile: number;
    note: string;
    encounterType: string;
    createdAt: string;
    updatedAt: string;
}

export enum EncounterType {
    PHYSICAL = 'physical',
    ILLNESS = 'illness',
    VACCINATION = 'vaccination',
}

export interface EncounterConstructor {
    note: string;
    encounterType: EncounterType;
}

export interface EncounterUpdate {
    id: number;
    note: string;
    encounterType: EncounterType;
}

export interface Diagnosis extends MedicalEntity {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface DiagnosisConstructor {
    name: string;
    description: string;
}

export interface DiagnosisUpdate {
    id: number;
    name: string;
    description: string;
}

export interface Medication extends MedicalEntity {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface MedicationConstructor {
    name: string;
    description: string;
}

export interface MedicationUpdate {
    id: number;
    name: string;
    description: string;
}

export interface Allergy extends MedicalEntity {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface AllergyConstructor {
    name: string;
    description: string;
}

export interface AllergyUpdate {
    id: number;
    name: string;
    description: string;
}

export interface Vaccination extends MedicalEntity {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface VaccinationConstructor {
    name: string;
    description: string;
}

export interface VaccinationUpdate {
    id: number;
    name: string;
    description: string;
}
