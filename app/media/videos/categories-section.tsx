"use client";

import { v4 as uuidv4 } from "uuid";

interface CategoriesSectionProps {
    categoryId?: string;
}

const categoryName = [
    "Frontend",
    "Backend",
    "Mobile",
    "DevOps",
    "ML",
    "Security",
    "Golang",
    "Python",
    "Node.JS",
    "TypeScript",
    "Next.JS",
];

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    const categories = categoryName.map((name) => ({
        id: uuidv4(),
        name,
        description: `Videos related to ${name.toLowerCase()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));

    return <pre>{JSON.stringify(categories, null, 2)}</pre>;
};
