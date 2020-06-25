export interface User {
    email?: string,
    patientProfile?: PatientProfile,
}

export interface PatientProfile {
    account: number,
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    sex: string,
    age: number,
    profilePicture?: string,
    encounters: Array<Encounter>,
    medications: Array<Medication>
    vaccinations: Array<Vaccination>,
}

export interface Encounter {
    id: number,
    patientProfile: number,
    note: string,
    encounterType: string,
}

export interface Medication {
    id: number,
    patientProfile: number,
    name: string,
}

export interface Vaccination {
    id: number,
    patientProfile: number,
    name: string,
}
