export interface UserLoginRequest {
    username: string
    password: string
}

export interface UserLogoutRequest {
    userId: number
}

export interface GetProjectRequest {
    name?: string // Include
    companyId?:number[]
    teamSize?: {
        from? : number,
        to? : number,
    } 
    backendProgrammingIds?: number[]
    frontendProgrammingIds?: number[]
    databaseProgrammingIds?: number[]
}