/* eslint-disable no-unused-vars */
import { Prop, Component } from 'vue-property-decorator';
import { DocHubComponentProto } from './Components';
import type { DocHubEditorContext } from '../..';

@Component
export class DocHubConstructorProto extends DocHubComponentProto {
  /**
   * Контекст вызова конструктора.
   * Содержит в себе информацию окружения для работы конструктора.
   */
  @Prop({
    type: Object,
    required: true
  }) readonly context: DocHubEditorContext;
  /**
   * Идентификатор конструктора.
   * Один компонент может быть вызван для нужд разных конструкторов.
   * Для идентификации конструктора используется UID.
   */
  @Prop({
    type: String,
    required: true
  }) readonly uid: string;
}
