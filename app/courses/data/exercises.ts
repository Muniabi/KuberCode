export interface Author {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
}

export interface Resource {
    id: string;
    title: string;
    type: "article" | "video" | "documentation";
    url: string;
    duration?: number;
}

export interface Hint {
    id: string;
    content: string;
    unlockAfter?: number; // minutes after starting
}

export interface Exercise {
    id: string;
    conceptId: string;
    languageId: string;
    title: string;
    description: string;
    type: "tutorial" | "practice";
    theory: string;
    initialCode: string;
    solution?: string;
    hints?: string[];
}

export const AUTHORS: Record<string, Author> = {
    "john-doe": {
        id: "john-doe",
        name: "Джон Доу",
        role: "Senior Developer",
        avatar: "JD",
        bio: "10+ лет опыта в разработке. Специализация на алгоритмах и структурах данных.",
    },
    "jane-smith": {
        id: "jane-smith",
        name: "Джейн Смит",
        role: "Tech Lead",
        avatar: "JS",
        bio: "Full-stack разработчик с фокусом на архитектуре приложений.",
    },
};

export const EXERCISES: Exercise[] = [
    {
        id: "basics-hello-world",
        conceptId: "basics",
        languageId: "cpp",
        title: "Hello, World!",
        description:
            "Классическая задача для начала изучения языка программирования",
        type: "tutorial",
        theory: `
            <h2>Что такое "Hello, World!"?</h2>
            <p>
                "Hello, World!" - это простейшая программа, которая выводит на экран текст "Hello, World!". 
                Эта программа часто используется для знакомства с новым языком программирования.
            </p>
            <h2>Почему это важно?</h2>
            <p>
                Написание "Hello, World!" помогает понять:
                <ul>
                    <li>Базовый синтаксис языка</li>
                    <li>Как запускать программы</li>
                    <li>Как работает вывод текста</li>
                </ul>
            </p>
        `,
        initialCode: `#include <iostream>

int main() {
    // Напишите программу, которая выведет "Hello, World!"
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
        hints: [
            "Для вывода в C++ используется std::cout",
            "Оператор << используется для передачи данных в поток вывода",
            "std::endl добавляет перевод строки и сбрасывает буфер",
        ],
    },
    {
        id: "basics-sum-numbers",
        conceptId: "basics",
        languageId: "cpp",
        title: "Сумма двух чисел",
        description:
            "Напишите программу, которая считывает два числа и выводит их сумму",
        type: "practice",
        theory: `
            <h2>Ввод и вывод в C++</h2>
            <p>
                В C++ для ввода данных используется объект <code>std::cin</code>, а для вывода - <code>std::cout</code>.
                Оператор <code>>></code> используется для ввода, а <code><<</code> для вывода.
            </p>
            <h2>Переменные в C++</h2>
            <p>
                Для хранения чисел в C++ используются различные типы данных:
                <ul>
                    <li><code>int</code> - для целых чисел</li>
                    <li><code>float</code> - для чисел с плавающей точкой</li>
                    <li><code>double</code> - для чисел с двойной точностью</li>
                </ul>
            </p>
        `,
        initialCode: `#include <iostream>

int main() {
    // Объявите две переменные для хранения чисел
    
    // Считайте два числа
    
    // Вычислите и выведите их сумму
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int a, b;
    std::cout << "Введите два числа: ";
    std::cin >> a >> b;
    std::cout << "Сумма: " << a + b << std::endl;
    return 0;
}`,
        hints: [
            "Используйте тип int для хранения целых чисел",
            "Для ввода используйте std::cin >> переменная",
            "Для вывода используйте std::cout << значение",
        ],
    },
    {
        id: "algorithms-palindrome",
        conceptId: "algorithms",
        languageId: "cpp",
        title: "Проверка палиндрома",
        description:
            "Напишите программу, которая проверяет, является ли строка палиндромом",
        type: "practice",
        theory: `
            <h2>Что такое палиндром?</h2>
            <p>
                Палиндром - это строка, которая читается одинаково слева направо и справа налево.
                Например: "radar", "level", "А роза упала на лапу Азора".
            </p>
            <h2>Алгоритм проверки</h2>
            <p>
                Есть несколько способов проверить, является ли строка палиндромом:
                <ul>
                    <li>Сравнить строку с её перевёрнутой версией</li>
                    <li>Использовать два указателя (с начала и с конца)</li>
                    <li>Рекурсивно сравнивать символы</li>
                </ul>
            </p>
        `,
        initialCode: `#include <iostream>
#include <string>

bool isPalindrome(const std::string& str) {
    // Напишите функцию проверки палиндрома
    
}

int main() {
    std::string input;
    std::cout << "Введите строку: ";
    std::getline(std::cin, input);
    
    if (isPalindrome(input)) {
        std::cout << "Это палиндром!" << std::endl;
    } else {
        std::cout << "Это не палиндром." << std::endl;
    }
    
    return 0;
}`,
        solution: `#include <iostream>
#include <string>
#include <algorithm>

bool isPalindrome(const std::string& str) {
    std::string clean;
    // Оставляем только буквы и приводим к нижнему регистру
    for (char c : str) {
        if (std::isalpha(c)) {
            clean += std::tolower(c);
        }
    }
    
    // Сравниваем с перевёрнутой версией
    std::string reversed = clean;
    std::reverse(reversed.begin(), reversed.end());
    return clean == reversed;
}

int main() {
    std::string input;
    std::cout << "Введите строку: ";
    std::getline(std::cin, input);
    
    if (isPalindrome(input)) {
        std::cout << "Это палиндром!" << std::endl;
    } else {
        std::cout << "Это не палиндром." << std::endl;
    }
    
    return 0;
}`,
        hints: [
            "Игнорируйте пробелы и знаки препинания",
            "Приведите все символы к одному регистру",
            "Можно использовать std::reverse для переворота строки",
        ],
    },
];
