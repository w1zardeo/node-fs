// Клас, що представляє секцію в бібліотеці
class Section {
    private _name: string;
    private _books: Book[] = [];

    constructor(name: string) {
        this._name = name;
    }

    // Getter для назви секції
    get name(): string {
        return this._name;
    }

    // Getter для книг у секції
    get books(): Book[] {
        return this._books;
    }

    // Метод для додавання книги до секції
    addBook(book: Book): void {
        this._books.push(book);
    }

    // Метод для видалення книги з секції
    removeBook(book: Book): void {
        const index = this._books.indexOf(book);
        if (index !== -1) {
            this._books.splice(index, 1);
        }
    }
}

// Клас, що представляє книгу в бібліотеці
class Book {
    private _id: number;
    private _title: string;
    private _author: string;
    private _year: number;
    private _quantity: number;
    private _genre: string;

    constructor(id: number, title: string, author: string, year: number, quantity: number, genre: string) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._year = year;
        this._quantity = quantity;
        this._genre = genre;
    }

    // Getter для ID книги
    get id(): number {
        return this._id;
    }

    // Getter для назви книги
    get title(): string {
        return this._title;
    }

    // Getter для автора книги
    get author(): string {
        return this._author;
    }

    // Getter для року видання книги
    get year(): number {
        return this._year;
    }

    // Getter для кількості книг
    get quantity(): number {
        return this._quantity;
    }

    // Setter для кількості книг
    set quantity(value: number) {
        this._quantity = value;
    }

    // Getter для жанру книги
    get genre(): string {
        return this._genre;
    }
}

// Клас, що представляє читача бібліотеки
class Reader {
    private _firstName: string;
    private _lastName: string;
    private _cardNumber: number;
    private _borrowedBooks: Book[] = [];

    constructor(firstName: string, lastName: string, cardNumber: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._cardNumber = cardNumber;
    }

    // Getter для імені читача
    get firstName(): string {
        return this._firstName;
    }

    // Getter для прізвища читача
    get lastName(): string {
        return this._lastName;
    }

    // Getter для номера читацького квитка
    get cardNumber(): number {
        return this._cardNumber;
    }

    // Getter для списку позичених книг
    get borrowedBooks(): Book[] {
        return this._borrowedBooks;
    }

    // Метод для додавання позиченої книги
    addBorrowedBook(book: Book): void {
        this._borrowedBooks.push(book);
    }

    // Метод для видалення позиченої книги
    removeBorrowedBook(book: Book): void {
        const index = this._borrowedBooks.indexOf(book);
        if (index !== -1) {
            this._borrowedBooks.splice(index, 1);
        }
    }
}
