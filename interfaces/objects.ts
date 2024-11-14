import { DocHubEditorURI } from './editors';
import { DataLakePath } from './datalake';
/**
 * Содержит метаданные задекларированного объекта
 */
export interface IDocHubObjectMeta {
    uid: string;            // Идентификатор объекта
    entity: string;         // Идентификатор сущности
    presentation: string;   // Идентификатор презентации объекта
    route: string;          // Параметризируемый путь к объекту в DataLake
    symbol?: string;        // Символ объекта для визуализации на диаграммах
    title?: string;         // Название объекта
    description?: string;   // Описание объекта
    constructor?: string;   // Идентификатор конструктора объектов
    editor?: string;        // Идентификатор редактора объектов
}

/**
 * RegExp для указания URL объекта в DocHub
 */
export const DocHubObjectURLRegExp = '^\\@[a-zA-Z0-9_$\\.]{1,}(\\/[a-zA-Z0-9_$\\.]{1,}){1,}(\\?[^(#|\\/)]*){0,1}(\\#[^(#|\\/|\\?)]*){0,1}$';

/**
 * Специальный формат адресации к объектам DocHub
 * Формат:      @<ID объекта>/<путь к объекту>[?<параметр=значение>[&<параметр=значение>]][#<ID презентации>]
 * Например:    @document/dochub.welcome?username=r.piontik#bio
 */
export class DocHubObjectURL extends String {
    constructor(...args:any) {
        for (const value of args) {
            if (!(new RegExp(DocHubObjectURLRegExp)).test(value))
                throw new Error(`Incorrect DocHubObjectURL [${value}] The string must be in the following format ${DocHubObjectURLRegExp}`, );
        }
        super(...args);
        return this;
    }
}

/**
 * VUE компонент редактора объекта
 */
export interface IDocHubObjectEditorComponent {
}

/**
 * Метаинформация о редакторе объекта
 */
export interface IDocHubObjectEditorItem {
    component: IDocHubObjectEditorComponent;
    uid: string;
    title: string;
}

/**
 * Описывает контекст редактируемого объекта
 */
export interface IDocHubObjectEditorContext extends IDocHubObjectMeta {
    path?: DataLakePath;    // Путь к объекту в Data Lake
                            // Если не определено берется из параметра openObjectEditor
    [key: string]: any;     // Произвольные ключи и значения
}


// Интерфейс доступа к задекларированным объектам в DataLake
export interface IDocHubObjects {
    /**
     * Возвращает коллекцию задекларированных объектов
     * @returns             - Коллекция задекларированных объектов
     */
    fetch(): Promise<IDocHubObjectMeta[]>;
    /**
     * Возвращает метаинформацию об объекте
     * @param uid           - Идентификатор объекта
     */
    get(uid: string): Promise<IDocHubObjectMeta>;
    /**
     * Возвращает метаданные задекларированного объекта для указанного пути
     * @param path          - Путь к объекту 
     */
    getMetaObjectByPath(path: DataLakePath): Promise<IDocHubObjectMeta | null>;
    /**
     * Регистрирует редактор объекта
     * @param uid           - Идентификатор типа объекта
     * @param component     - VUE компонент для редактирования объекта
     * @param title         - Название редактора объекта
     */
    registerEditor(uid: string, component: IDocHubObjectEditorComponent, title?: string);
    /**
     * Возвращает массив зарегистрированных редакторов объектов
     * @returns             - Массив зарегистрированных редакторов объектов
     */
    fetchEditors(): Promise<IDocHubObjectEditorItem[]>;
    /**
     * Возвращает компонент редактора объекта
     * @param uid           - Идентификатор типа объекта
     * @returns             - IDocHubEditorItem
     */
    getObjectEditor(uid: string): Promise<IDocHubObjectEditorItem>;

    /**
     * Генерирует URL для редактирования объекта по указанному пути
     * @param path          - Путь к объекту, разделенный "/"
     */
    makeEditURLByPath(path: DataLakePath): Promise<DocHubEditorURI>;
    /**
     * Запрос на открытие объекта на пользовательское редактирование. Необязательно будет выполнен.
     * Если редактор уже открыт, активирует его.
     * @param path              - Путь к редактируемому объекту
     * @param context           - Контекст редактирования объекта. Необходим для связных редакторов и конструкторов.
     * @returns                 - Компонент редактора, если открытие оказалось успешным
     */
    openObjectEditor(path: DataLakePath, context?: IDocHubObjectEditorContext): Promise<IDocHubObjectEditorComponent>;

}

