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
    image: string;
    duration: string;
    hasEmployment: boolean;
    isPopular?: boolean;
    rating: number;
    level: "beginner" | "intermediate" | "advanced";
    studentsCount: number;
    completionRate: number;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    price: {
        current: number;
        old?: number;
    };
    direction: string;
    isFree: boolean;
    tags: string[];
    logo: string;
}

export interface CourseResponse {
    courses: Course[];
    total: number;
}
