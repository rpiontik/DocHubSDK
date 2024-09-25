// Содержит метаданные задекларированного объекта
export interface IDocHubObjectMeta {
    uid: string;            // Идентификатор объекта
    entity: string;         // Идентификатор сущности
    route: string;          // Параметризируемый путь к объекту в DataLake
    symbol?: string;        // Символ объекта для визуализации на диаграммах
    title?: string;         // Название объекта
    description?: string;   // Описание объекта
}

// Редакторы документов
export interface IDocHubObjects {
    // Возвращает коллекцию задекларированных объектов
    fetch(): IDocHubObjectMeta[];
    // Возвращает объект по идентификатору
    get(uid: string): IDocHubObjectMeta;
}
