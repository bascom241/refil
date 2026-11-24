export interface LocationResponse {
    location: {
        type: string, 
        coordinates:number[]
    }
    street: string 
    user: string
    label: string
    city : string
    state: string
    country: string
    additionalInfo: string 

    
}