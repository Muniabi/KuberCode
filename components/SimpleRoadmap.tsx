import React from "react";

interface SimpleRoadmapProps {
    topics: Array<{ label: string; completed: boolean }>;
}

const SimpleRoadmap: React.FC<SimpleRoadmapProps> = ({ topics }) => {
    return (
        <div className="grid gap-4">
            {topics.map((topic, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                        topic.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                >
                    <h3 className="font-semibold">{topic.label}</h3>
                    <p className="text-sm">
                        {topic.completed ? "Изучено" : "В процессе"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SimpleRoadmap;
