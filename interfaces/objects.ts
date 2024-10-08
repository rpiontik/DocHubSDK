// Содержит метаданные задекларированного объекта
export interface IDocHubObjectMeta {
    uid: string;            // Идентификатор объекта
    entity: string;         // Идентификатор сущности
    presentation: string;   // Идентификатор презентации объекта
    route: string;          // Параметризируемый путь к объекту в DataLake
    symbol?: string;        // Символ объекта для визуализации на диаграммах
    title?: string;         // Название объекта
    description?: string;   // Описание объекта
    constructor?: string;   // RegEx паттерн конструктора объектов
}

// Интерфейс доступа к задекларированным объектам в DataLake
export interface IDocHubObjects {
    // Возвращает коллекцию задекларированных объектов
    fetch(): Promise<IDocHubObjectMeta[]>;
    // Возвращает объект по идентификатору
    get(uid: string): Promise<IDocHubObjectMeta>;
    // Возвращает метаданные декларированного объекта для указанного пути
    //  path    - путь к объекту 
    getMetaObjectByPath(path: string): Promise<IDocHubObjectMeta | null>;
}

