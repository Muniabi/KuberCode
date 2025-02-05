"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Handle,
    Position,
    NodeProps,
    addEdge,
    Connection,
    Edge,
    useViewport,
    ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface RoadmapProps {
    completed: number;
    total: number;
    currentTopic: string;
    nextTopic: string;
}

// Компонент тултипа
const InfoTooltip = ({
    data,
    visible,
    position,
}: {
    data: any;
    visible: boolean;
    position: { x: number; y: number };
}) => {
    if (!visible) return null;

    return (
        <div
            className="absolute z-50 w-[400px] p-6 rounded-xl
                       dark:bg-gray-800 bg-white
                       border dark:border-gray-700 border-gray-200
                       shadow-xl transition-all duration-300
                       transform -translate-x-1/2"
            style={{
                left: position.x,
                top: position.y - 180, // Поднимаем тултип выше карточки
            }}
        >
            <div className="flex items-start gap-4 mb-4">
                <div
                    className="w-12 h-12 flex items-center justify-center
                               dark:bg-gray-700 bg-gray-100 rounded-lg
                               text-lg font-semibold"
                >
                    {data.icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold dark:text-white">
                            {data.label}
                        </h3>
                        <span
                            className="px-2 py-1 text-xs rounded
                                       dark:bg-green-900 bg-green-100
                                       dark:text-green-400 text-green-700"
                        >
                            {data.completed ? "Mastered" : "In Progress"}
                        </span>
                    </div>
                    <p className="text-sm dark:text-gray-400 text-gray-600">
                        {data.description ||
                            "Learn and master the concepts of this topic."}
                    </p>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="w-full py-2 px-4 rounded-lg
                                  dark:bg-gray-700 bg-gray-100
                                  dark:text-gray-300 text-gray-700
                                  hover:dark:bg-gray-600 hover:bg-gray-200
                                  transition-colors duration-300"
                >
                    Explore concept
                </button>
            </div>
        </div>
    );
};

// Кастомный компонент для узла
const CustomNode = ({ data }: NodeProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShowTooltip(false);
        }, 100); // 100ms задержка перед скрытием
    };

    return (
        <div
            className="group relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={data.url || "#"}>
                <div
                    className={`
                    p-4 rounded-lg min-w-[200px]
                    dark:bg-gray-800 bg-white
                    border dark:border-gray-700 border-gray-200
                    shadow-sm hover:shadow-xl
                    transform transition-transform duration-300
                    hover:scale-105
                    ${data.locked ? "opacity-75" : ""}
                    ${
                        data.completed
                            ? "dark:border-green-400 border-green-500"
                            : ""
                    }
                `}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className="w-8 h-8 flex items-center justify-center 
                                      dark:bg-gray-700 bg-gray-100 rounded
                                      transform transition-all duration-300
                                      group-hover:rotate-6"
                        >
                            {data.icon || data.label.charAt(0)}
                        </div>
                        <h3
                            className="font-semibold dark:text-gray-100 text-gray-900
                                     transition-colors duration-300"
                        >
                            {data.label}
                        </h3>
                    </div>
                    {data.locked && (
                        <div className="absolute top-2 right-2">
                            <svg
                                className="w-4 h-4 dark:text-gray-500 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                    )}
                    {data.completed && (
                        <div className="absolute top-2 right-2 animate-bounce">
                            <svg
                                className="w-4 h-4 dark:text-green-400 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    )}
                    <Handle
                        type="target"
                        position={Position.Top}
                        className="!bg-gray-400 dark:!bg-gray-500 transition-colors duration-300"
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        className="!bg-gray-400 dark:!bg-gray-500 transition-colors duration-300"
                    />
                </div>
            </Link>
            <div
                className={`
                    absolute z-50 w-[300px] p-4 rounded-xl
                    dark:bg-gray-800 bg-white
                    border dark:border-gray-700 border-gray-200
                    shadow-xl
                    transform -translate-x-1/2
                    ${
                        showTooltip
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                    }
                `}
                style={{
                    left: "50%",
                    bottom: "100%",
                    marginBottom: "10px",
                    transition: "opacity 0.2s ease",
                }}
                onMouseEnter={() => {
                    if (timeoutId) clearTimeout(timeoutId);
                    setShowTooltip(true);
                }}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="w-10 h-10 flex items-center justify-center
                                  dark:bg-gray-700 bg-gray-100 rounded-lg
                                  text-base font-semibold"
                    >
                        {data.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold dark:text-white">
                                {data.label}
                            </h3>
                            <span
                                className={`px-1.5 py-0.5 text-xs rounded
                                ${
                                    data.locked
                                        ? "dark:bg-gray-700 bg-gray-100 dark:text-gray-400 text-gray-600"
                                        : data.completed
                                        ? "dark:bg-green-900 bg-green-100 dark:text-green-400 text-green-700"
                                        : "dark:bg-blue-900 bg-blue-100 dark:text-blue-400 text-blue-700"
                                }`}
                            >
                                {data.locked
                                    ? "Недоступно"
                                    : data.completed
                                    ? "Изучено"
                                    : "В процессе"}
                            </span>
                        </div>
                        <p className="text-xs dark:text-gray-400 text-gray-600">
                            {data.description ||
                                "Изучите и освойте концепции этой темы."}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="w-full py-1.5 px-3 rounded-lg text-sm
                                     dark:bg-gray-700 bg-gray-100
                                     dark:text-gray-300 text-gray-700
                                     hover:dark:bg-gray-600 hover:bg-gray-200
                                     transition-colors duration-300"
                    >
                        Изучить тему
                    </button>
                </div>
            </div>
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

const nodes = [
    {
        id: "1",
        type: "custom",
        position: {
            x: 500,
            y: 50,
        },
        data: {
            label: "Основы",
            icon: "Ос",
            completed: true,
            url: "/learn/basics",
            description:
                "Изучите фундаментальные концепции программирования на JavaScript.",
        },
    },
    {
        id: "2",
        type: "custom",
        position: {
            x: 390,
            y: 200,
        },
        data: {
            label: "Числа",
            icon: "Чс",
            completed: true,
            url: "/learn/numbers",
            description:
                "Изучите работу с числами и числовыми операциями в JavaScript.",
        },
    },
    {
        id: "3",
        type: "custom",
        position: {
            x: 640,
            y: 200,
        },
        data: {
            label: "Операторы",
            icon: "Ар",
            completed: true,
            url: "/learn/arithmetic",
            description:
                "Освойте использование арифметических операторов в JavaScript.",
        },
    },
    {
        id: "4",
        type: "custom",
        position: {
            x: 870,
            y: 200,
        },
        data: {
            label: "Строки",
            icon: "Ст",
            url: "/learn/strings",
            description:
                "Изучите работу со строками и методы их обработки в JavaScript.",
        },
    },
    {
        id: "5",
        type: "custom",
        position: {
            x: 90,
            y: 200,
        },
        data: {
            label: "Логические значения",
            icon: "Лг",
            url: "/learn/booleans",
            description: "Поймите концепцию логических значений в JavaScript.",
        },
    },
    {
        id: "6",
        type: "custom",
        position: {
            x: 600,
            y: 350,
        },
        data: {
            label: "Массивы",
            icon: "Мс",
            locked: true,
            url: "/learn/arrays",
            description:
                "Изучите работу с массивами и их методами в JavaScript.",
        },
    },
    {
        id: "7",
        type: "custom",
        position: {
            x: 900,
            y: 350,
        },
        data: {
            label: "Условные операторы",
            icon: "Ус",
            locked: true,
            url: "/learn/conditionals",
            description:
                "Освойте использование условных операторов в JavaScript.",
        },
    },
    {
        id: "8",
        type: "custom",
        position: {
            x: 300,
            y: 500,
        },
        data: {
            label: "Операторы сравнения",
            icon: "Ср",
            locked: true,
            url: "/learn/comparison",
            description: "Изучите операторы сравнения в JavaScript.",
        },
    },
    {
        id: "9",
        type: "custom",
        position: {
            x: 600,
            y: 500,
        },
        data: {
            label: "Инкремент/Декремент",
            icon: "Ин",
            locked: true,
            url: "/learn/increment-decrement",
            description:
                "Освойте операторы инкремента и декремента в JavaScript.",
        },
    },
    {
        id: "10",
        type: "custom",
        position: {
            x: 900,
            y: 500,
        },
        data: {
            label: "Цикл For",
            icon: "For",
            locked: true,
            url: "/learn/for-loops",
            description: "Изучите работу с циклом For в JavaScript.",
        },
    },
];

const edges = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: {
            stroke: "rgb(34 197 94)",
            strokeWidth: 2,
        },
    },
    {
        id: "e1-3",
        source: "1",
        target: "3",
        animated: true,
        style: {
            stroke: "rgb(34 197 94)",
            strokeWidth: 2,
        },
    },
    {
        id: "e1-4",
        source: "1",
        target: "4",
        animated: true,
        style: {
            stroke: "rgb(34 197 94)",
            strokeWidth: 2,
        },
    },
    {
        id: "e1-5",
        source: "1",
        target: "5",
        animated: true,
        style: {
            stroke: "rgb(34 197 94)",
            strokeWidth: 2,
        },
    },
    {
        id: "e2-6",
        source: "2",
        target: "6",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e3-7",
        source: "3",
        target: "7",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e4-8",
        source: "4",
        target: "8",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e6-9",
        source: "6",
        target: "9",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e7-10",
        source: "7",
        target: "10",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e8-11",
        source: "8",
        target: "11",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
    {
        id: "e8-12",
        source: "8",
        target: "12",
        style: {
            stroke: "#6b7280",
            strokeWidth: 2,
        },
    },
];

const Roadmap = ({
    completed,
    total,
    currentTopic,
    nextTopic,
}: RoadmapProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNodes, setCurrentNodes] = useState(nodes);
    const [currentEdges, setCurrentEdges] = useState<Edge[]>(edges);
    const [showViewport, setShowViewport] = useState(false);
    const [viewport, setViewport] = useState({ x: -80, y: 151, zoom: 1.22 });
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    useEffect(() => {
        const updateDimensions = () => {
            const container = document.querySelector(".roadmap-container");
            const flow = document.querySelector(".react-flow");

            if (container && flow) {
                const containerWidth = container.clientWidth;
                const flowHeight = flow.scrollHeight;
                const minHeight = 600; // Минимальная высота

                setDimensions({
                    width: containerWidth,
                    height: Math.max(flowHeight + 100, minHeight), // Добавляем отступ и проверяем минимальную высоту
                });

                const minRequiredWidth = 1200;
                const newScale = containerWidth / minRequiredWidth;
                setScale(Math.min(1, newScale));
            }
        };

        // Первоначальное обновление после монтирования
        setTimeout(updateDimensions, 100);

        // Обновление при изменении размера окна
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if (reactFlowInstance.current) {
            const firstNode = currentNodes[0];
            if (firstNode) {
                reactFlowInstance.current.fitView({ padding: 0.1 });
            }
        }
    }, [currentNodes]);

    const onNodesChange = (changes: any) => {
        setCurrentNodes((nds) => {
            const updatedNodes = [...nds];
            changes.forEach((change: any) => {
                const nodeIndex = updatedNodes.findIndex(
                    (n) => n.id === change.id
                );
                if (nodeIndex !== -1) {
                    if (change.type === "position" && change.position) {
                        updatedNodes[nodeIndex] = {
                            ...updatedNodes[nodeIndex],
                            position: change.position,
                        };
                    } else {
                        // Обрабатываем другие типы изменений
                        updatedNodes[nodeIndex] = {
                            ...updatedNodes[nodeIndex],
                            ...change,
                        };
                    }
                }
            });
            return updatedNodes;
        });
    };

    const onEdgesChange = (changes: any) => {
        setCurrentEdges((eds) => {
            const updatedEdges = [...eds];
            changes.forEach((change: any) => {
                const edgeIndex = updatedEdges.findIndex(
                    (e) => e.id === change.id
                );
                if (edgeIndex !== -1) {
                    if (change.type === "remove") {
                        updatedEdges.splice(edgeIndex, 1);
                    }
                }
            });
            return updatedEdges;
        });
    };
    const onConnect = (params: Connection) => {
        setCurrentEdges((eds) => {
            const newEdges = addEdge(params, eds);
            return newEdges as Edge[];
        });
    };

    const handleSave = () => {
        console.log("Nodes:", currentNodes);
        console.log("Edges:", currentEdges);
        setIsEditing(false);
    };

    const exportToJson = () => {
        const data = {
            nodes: currentNodes,
            edges: currentEdges,
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "roadmap-data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const onMoveEnd = (event: any, viewport: any) => {
        setViewport({
            x: Math.round(viewport.x),
            y: Math.round(viewport.y),
            zoom: Math.round(viewport.zoom * 100) / 100,
        });
    };

    return (
        <div className="relative" ref={reactFlowWrapper}>
            {/* Кнопки управления */}
            <div className="absolute top-0 right-0 z-10 flex gap-2 m-4">
                {!isEditing ? (
                    <>
                        <Button
                            onClick={() => setShowViewport(true)}
                            variant="outline"
                            className="gap-2"
                        >
                            <Eye size={16} />
                            Параметры карты
                        </Button>
                        <Button
                            onClick={exportToJson}
                            variant="outline"
                            className="gap-2"
                        >
                            <Download size={16} />
                            Экспорт JSON
                        </Button>
                        <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                        >
                            Редактировать
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => {
                                setCurrentNodes(nodes);
                                setCurrentEdges(edges);
                                setIsEditing(false);
                            }}
                            variant="outline"
                        >
                            Отменить
                        </Button>
                        <Button onClick={handleSave} variant="default">
                            Сохранить
                        </Button>
                    </>
                )}
            </div>

            {/* Диалоговое окно с параметрами */}
            <Dialog open={showViewport} onOpenChange={setShowViewport}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Параметры отображения карты</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium">
                                    Позиция X:
                                </span>
                                <code className="rounded bg-muted px-2 py-1">
                                    {viewport.x}
                                </code>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium">
                                    Позиция Y:
                                </span>
                                <code className="rounded bg-muted px-2 py-1">
                                    {viewport.y}
                                </code>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium">
                                Масштаб:
                            </span>
                            <code className="rounded bg-muted px-2 py-1">
                                {viewport.zoom}x
                            </code>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="roadmap-container w-full overflow-x-auto">
                <div
                    style={{
                        width: dimensions.width,
                        height: dimensions.height,
                        // transform: `scale(${scale})`,
                        transformOrigin: "top left",
                    }}
                >
                    <ReactFlow
                        nodes={currentNodes}
                        edges={currentEdges}
                        nodeTypes={nodeTypes}
                        fitView={false}
                        panOnScroll={true}
                        zoomOnScroll={true}
                        zoomOnPinch={true}
                        panOnDrag={isEditing}
                        preventScrolling={false}
                        zoomOnDoubleClick={isEditing}
                        minZoom={0.5}
                        maxZoom={2}
                        defaultViewport={viewport}
                        style={{ background: "transparent" }}
                        proOptions={{ hideAttribution: true }}
                        onNodesChange={isEditing ? onNodesChange : undefined}
                        onEdgesChange={isEditing ? onEdgesChange : undefined}
                        onConnect={isEditing ? onConnect : undefined}
                        deleteKeyCode={["Backspace", "Delete"]}
                        onMoveEnd={onMoveEnd}
                        fitViewOptions={{
                            padding: 0.2,
                            includeHiddenNodes: true,
                        }}
                        nodesDraggable={isEditing}
                        nodesConnectable={isEditing}
                        elementsSelectable={isEditing}
                        // onLoad={(instance) => {
                        //     reactFlowInstance.current = instance;
                        //     instance.fitView({ padding: 0.1 });
                        // }}
                    >
                        {isEditing && (
                            <>
                                <Background />
                                <Controls />
                            </>
                        )}
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
