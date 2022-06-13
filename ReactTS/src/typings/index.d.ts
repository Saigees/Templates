
export interface CustomRedirect {
    location: string;
    route: string;
}

export interface CustomConfig {
    title: string;
    about: string;
    redirects: CustomRedirect[];
}