export interface Author {
    id: string;
    name: string;
    avatar: string;
    position: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    hasEmployment: boolean;
    image: string;
    author: Author;
    price: number;
    rating: number;
    studentsCount: number;
}

export interface CourseResponse {
    courses: Course[];
    total: number;
}
