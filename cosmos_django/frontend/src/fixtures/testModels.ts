import * as modelTypes from '../types/modelTypes';

export const testUser: modelTypes.User = {
    id: 4,
    email: 'test123@gmail.com',
    patientProfile: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1998-06-09',
        sex: modelTypes.Sex.MALE,
        age: 21,
        profilePicture: 'some profile picture',
        race: 'white',
        ethnicity: 'white',
        religion: 'hindu',
        insurance: 'aetna',
        pharmacy: 'walgreens',
        address: {
            addressLine: '1600 Penn Ave',
            city: 'Washington DC',
            state: 'Maryland',
            zipCode: '08550',
        },
        encounters: [],
        diagnoses: [],
        vaccinations: [],
        allergies: [],
        medications: [],
    },
};

export const testEncounter: modelTypes.Encounter = {
    id: 4,
    patientProfile: 2,
    note: 'Patient encounter note.',
    encounterType: modelTypes.EncounterType.ILLNESS,
    createdAt: 'Some date.',
    updatedAt: 'Some other date',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

export const testAllergy: modelTypes.Allergy = {
    id: 4,
    name: 'Peanut Butter',
    description: 'Peanut butter description.',
    createdAt: 'Some date.',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

export const testDiagnosis: modelTypes.Diagnosis = {
    id: 4,
    name: 'Flu',
    description: 'Virus.',
    createdAt: 'Some date.',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

export const testMedication: modelTypes.Medication = {
    id: 4,
    name: 'Advil',
    description: 'A drug.',
    createdAt: 'Some date.',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

export const testVaccination: modelTypes.Vaccination = {
    id: 4,
    name: 'Covid',
    description: 'A vaccination.',
    createdAt: 'Some date.',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};
