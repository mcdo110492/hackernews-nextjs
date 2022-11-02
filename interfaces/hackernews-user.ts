

export interface HackerNewsUser {
    id: string;
    created: Date|string;
    karma: number;
    about: string;
    submitted: number[];
}