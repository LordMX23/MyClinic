export interface User{
    FullName:                                                     string;
    Email:                                                        string;
    PerfilId:                                                     string;
    ClinicId:                                                     string;
    aud:                                                          string;
    iss:                                                          string;
    exp:                                                          number;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    iat:                                                          number;
    nbf:                                                          number;
}