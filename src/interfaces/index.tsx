export interface Office {
    id: number;
    street1: string;
    street2?: string; // Optional property
    city: string;
    country: string;
    email: string;
    contactNumber1?: string; // Optional property
    contactNumber2?: string; // Optional property
    contactNumber3?: string; // Optional property
    additionalDetails?: string; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    people: Person[]; // Assuming Person is defined elsewhere
}

export interface PatientAttachment {
    id: number;
    personId?: number; // Optional property
    title: string;
    attachment: Uint8Array; // Use Uint8Array for binary data
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    person?: Person; // Assuming Person is defined elsewhere
}

export interface PatientEmergencyContact {
    id: number;
    personId?: number; // Optional property
    firstName: string;
    middleName?: string; // Optional property
    lastName: string;
    street1: string;
    street2?: string; // Optional property
    city: string;
    country: string;
    email: string;
    contactNumber1?: string; // Optional property
    contactNumber2?: string; // Optional property
    contactNumber3?: string; // Optional property
    additionalDetails?: string; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    person?: Person; // Assuming Person is defined elsewhere
}

export interface PatientMedicalLetter {
    id: number;
    patientVisit?: number; // Optional property
    letter?: number; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    patientVisitNavigation?: PatientVisit; // Assuming PatientVisit is defined elsewhere
}

export interface PatientVisit {
    id: number;
    personId?: number; // Optional property
    visitDate?: Date; // Optional property
    notes?: string; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    billing?: number; // Optional property
    patientMedicalLetters?: PatientMedicalLetter[]; // Assuming PatientMedicalLetter is defined elsewhere
    patientVisitAttachments?: PatientVisitAttachment[]; // Assuming PatientVisitAttachment is defined elsewhere
    patientVisitPrescriptions?: PatientVisitPrescription[]; // Assuming PatientVisitPrescription is defined elsewhere
    patientVisitSickLeaves?: PatientVisitSickLeave[]; // Assuming PatientVisitSickLeave is defined elsewhere
    person?: Person; // Assuming Person is defined elsewhere
}

export interface PatientVisitAttachment {
    id: number;
    patientVisit?: number; // Optional property
    title: string;
    attachment: Uint8Array; // Use Uint8Array for binary data
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    patientVisitNavigation?: PatientVisit; // Assuming PatientVisit is defined elsewhere
}

export interface PatientVisitPrescription {
    id: number;
    patientVisit?: number; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    quantity?: number; // Optional property
    medication: string;
    patientVisitNavigation?: PatientVisit; // Assuming PatientVisit is defined elsewhere
}

export interface PatientVisitSickLeave {
    id: number;
    patientVisit?: number; // Optional property
    days?: number; // Optional property
    reasoning: string;
    created?: Date; // Optional property
    startDate?: Date; // Optional property
    endDate?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    patientVisitNavigation?: PatientVisit; // Assuming PatientVisit is defined elsewhere
}

export interface Person {
    id: number;
    firstName: string;
    middleName?: string; // Optional property
    lastName: string;
    street1: string;
    street2?: string; // Optional property
    city: string;
    country: string;
    email: string;
    contactNumber1?: string; // Optional property
    contactNumber2?: string; // Optional property
    contactNumber3?: string; // Optional property
    additionalDetails?: string; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    personType?: number; // Optional property
    office?: number; // Optional property
    officeNavigation?: Office; // Assuming Office is defined elsewhere
    patientAttachments?: PatientAttachment[]; // Assuming PatientAttachment is defined elsewhere
    patientEmergencyContacts?: PatientEmergencyContact[]; // Assuming PatientEmergencyContact is defined elsewhere
    patientVisits?: PatientVisit[]; // Assuming PatientVisit is defined elsewhere
    personTypeNavigation?: PersonType; // Assuming PersonType is defined elsewhere
    userAccesses?: UserAccess[]; // Assuming UserAccess is defined elsewhere
}

export interface PersonType {
    id: number;
    typeOfPerson: string;
    people?: Person[]; // Assuming Person is defined elsewhere
}

export interface UserAccess {
    id: number;
    personId?: number; // Optional property
    username: string;
    pw: string; // Consider renaming for clarity (e.g., password)
    accessLevel?: number; // Optional property
    created?: Date; // Optional property
    createdBy?: string; // Optional property
    modified?: Date; // Optional property
    modifiedBy?: string; // Optional property
    personSignature?: boolean; // Optional property
    person?: Person; // Assuming Person is defined elsewhere
}

export interface DataFromLogin{
    token: string;
    userAccess?: UserAccess;
    person?: Person;
}
