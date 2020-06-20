export interface Account {
    email?: string,
    patient_profile?: PatientProfile,
}

export interface PatientProfile {
    account: number,
    id: number,
    first_name: string,
    last_name: string,
    full_name: string,
    date_of_birth: string,
    sex: string,
    age: number,
    profile_picture?: string,
    visits: Array<Visit>,
    medications: Array<Medication>
    vaccinations: Array<Vaccination>,
}

export interface Visit {
    id: number,
    patient_profile: number,
    note: string,
    visit_type: string,
}

export interface Medication {
    id: number,
    patient_profile: number,
    name: string,
}

export interface Vaccination {
    id: number,
    patient_profile: number,
    name: string,
}
