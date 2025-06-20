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
    tests?: { input: any[]; expected: number }[];
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
        languageId: "js",
        title: "Умная сумма чисел",
        description:
            "Реализуйте функцию, которая находит сумму чисел с учетом особых правил",
        type: "practice",
        theory: `
            <h2>Работа с числами в JavaScript</h2>
            <p>
                В JavaScript числа могут быть как целыми, так и с плавающей точкой. При работе с числами важно учитывать:
                <ul>
                    <li>Преобразование строк в числа (parseInt, parseFloat)</li>
                    <li>Обработку специальных значений (NaN, Infinity)</li>
                    <li>Округление и работу с десятичными числами</li>
                </ul>
            </p>
            <h3>Задача</h3>
            <p>
                Напишите функцию, которая принимает массив значений (числа и строки) и возвращает сумму всех чисел в массиве с учетом следующих правил:
                <ul>
                    <li>Строки, которые можно преобразовать в числа, должны быть преобразованы и учтены в сумме</li>
                    <li>Отрицательные числа должны быть взяты по модулю</li>
                    <li>Строки, которые нельзя преобразовать в числа, должны быть проигнорированы</li>
                    <li>Результат должен быть округлен до 2 знаков после запятой</li>
                </ul>
            </p>
        `,
        hints: [
            "Используйте parseFloat() для преобразования строк в числа",
            "Функция Math.abs() поможет получить модуль числа",
            "Метод Number.isNaN() проверит, является ли значение NaN",
            "Для округления до 2 знаков используйте toFixed(2)",
        ],
        solution: `function smartSum(arr) {
    // Преобразуем и фильтруем значения
    const numbers = arr
        .map(item => {
            // Если это число, берем его модуль
            if (typeof item === 'number') {
                return Math.abs(item);
            }
            // Если это строка, пробуем преобразовать в число
            const num = parseFloat(item);
            return Number.isNaN(num) ? 0 : Math.abs(num);
        })
        // Фильтруем все нечисловые значения
        .filter(num => !Number.isNaN(num));
    
    // Суммируем все числа
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    // Округляем до 2 знаков после запятой
    return Number(sum.toFixed(2));
}`,
        initialCode: `function smartSum(arr) {
    // Ваш код здесь
}`,
        tests: [
            {
                input: [[1, -2, "3.14", "abc", 5]],
                expected: 11.14,
            },
            {
                input: [["abc", "def"]],
                expected: 0,
            },
            {
                input: [["-1.5", 2.789, -3]],
                expected: 7.29,
            },
            {
                input: [[1.234, -5.678, "9.101", "test", 2]],
                expected: 18.01,
            },
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
