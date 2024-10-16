import { IDocHubContentProvider } from './contents';
import { IDocHubProtocol } from './protocols';
import { IDocHubDocument } from './documents';
import { IDocHubEditors } from './editors';
import { IDocHubDataLake } from './datalake';
import { IDocHubConstructors } from './constructors';
import { IDocHubObjects } from './objects';
import { IDocHubUI } from './ui';
import { IDocHubLocalStorage } from './localstorage';

export interface IDocHubEnv {
    [id: string]: string
}

export interface IDocHubProblems {
    // Регистрирует ошибку в системе
    emit(problem: Error, title?: string, uid?: string);
}

export interface IDocHubSettingsCollection {
    [id: string]: any;
}

export interface IDocHubSettings {
    // Регистрирует UI компонент настроек
    //  component - VUE компонент
    //  location  - размещение UI компонента в дереве настроек
    //  tags      - массив тегов для поиска компонента настроек
    registerUI(component: any, location: string, tags: string[]);

    // Сохраняет структуру с настройками
    //  settings    -   сохраняемая структура
    push(settings: IDocHubSettingsCollection);

    // Получает настройки 
    //  fields      - требуемый массив полей
    pull(fields: IDocHubSettingsCollection | string[]): IDocHubSettingsCollection;
}

export enum DocHubNavigateCommands {
    back = '$_back_$',
    root = '$_root_$'
}

export enum DocHubNavigateTarget {
    blank = '_blank',
    self = '_self',
    parent = '_parent',
    top = '_top'
}

export interface IDocHubRouter {
    // Регистрирует роут в формате VUE2
    registerRoute(route: object);
    // Регистрирует middleware в формате VUE2
    registerMiddleware(middleware: object);
    // Указывает на какой роут перейти в DocHub
    navigate(url: string | DocHubNavigateCommands, target?:DocHubNavigateTarget);
}

export interface IDocHubContentProviders {
    // Возвращает контент-провайдер по типу контента
    get(contentType: string): IDocHubContentProvider;
    // Регистрирует контент-провайдер
    register(contentType: string, provider: IDocHubContentProvider);
    // Возвращает массив зарегистрированных типов 
    fetch(): string[];
}

export interface IDocHubProtocols {
    // Возвращает драйвер протокола по идентификатору
    get(protocol: string): IDocHubProtocol;
    // Регистрирует драйвер протокола
    register(protocol: string, driver: IDocHubProtocol);
    // Возвращает массив зарегистрированных протоколов 
    fetch(): string[];
}

export interface IDocHubDocuments {
    // Регистрирует тип документа
    register(type: string, document: IDocHubDocument);
    // Возвращает массив зарегистрированных типов документов 
    fetch(): string[];
}

// Интерфейс внутренней шины событий 
export interface IDocHubEventBus {
    // Отправляет событие в шину
    $emit(event: string, data: any);
    // Монтирует слушателя в шину
    $on(event: string, func: Function);
    // Отмонтирует слушателя от шины
    $off(event: string, func: Function);
}

// Главный интерфейс
export interface IDocHubCore {
    problems: IDocHubProblems;                  // Проблемы
    settings: IDocHubSettings;                  // Пользовательские настройки
    localStore: IDocHubLocalStorage;            // Интерфейс локального хранилища
    router: IDocHubRouter;                      // Работа с UI роутами
    contentProviders: IDocHubContentProviders;  // Провайдеры контента
    protocols: IDocHubProtocols;                // Протоколы доступа к данным
    documents: IDocHubDocuments;                // Документы
    editors: IDocHubEditors;                    // Редакторы
    constructors: IDocHubConstructors;          // Конструкторы
    ui: IDocHubUI;                              // UI порт
    dataLake: IDocHubDataLake;                  // Интерфейс к архкоду
    objects: IDocHubObjects;                    // Задекларированные объекты сущностей 
    eventBus: IDocHubEventBus;                  // Внутренняя шина событий
    version(): string;                          // Версия ядра
}