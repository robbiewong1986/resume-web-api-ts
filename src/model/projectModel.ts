export interface ProjectData {
    id: number;
    workExperienceCompanyId: number;
    name: string;
    //companyName: string;
    company: {
        id: number
        name: string
    }
    description?: string;
    duty?: string;
    teamSize?: number;
    backendProgrammings?: {
        id: number
        name: string
    }[];
    frontendProgrammings?: {
        id: number
        name: string
    }[];
    databaseProgrammings?: {
        id: number
        name: string
    }[];
    referenceLinks?: string[];
    projectImages?: string[];
    mongoDetailId?: string;
    //updatedDt: string;
}


export interface ProgrammingRelatedData {
    id: number
    name: string
    isFrontend: boolean
    isBackend: boolean
    isDatabase: boolean
}


export interface CompanyData {
    id: number
    name: string
}

