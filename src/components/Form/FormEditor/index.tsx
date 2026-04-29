import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  GeneralHtmlSupport,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  LinkImage,
  SourceEditing,
  AutoLink,
  Link,
  Heading,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Code,
  CodeBlock,
  BlockQuote,
  List,
  TodoList,
  Indent,
  IndentBlock,
  Alignment,
  HorizontalLine,
  RemoveFormat,
  FindAndReplace,
  SelectAll,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  PasteFromOffice,
  SpecialCharacters,
  SpecialCharactersEssentials,
} from 'ckeditor5';
import React, { useState } from 'react';

import styles from 'styles.module.scss';
import './index.scss';
import 'ckeditor5/ckeditor5.css';

import { ModalDAMComponent } from 'components/ModalDam';
import { SVGComponent } from 'components/SVGComponent';

const FormEditor = ({ field }: any) => {
  const [editorState, setEditorState] = useState<any>();
  const [show, setShow] = useState(false);
  const onSelect = (data: any) => {
    editorState?.model.change(() => {
      const imgTag = `<img  src="${data[0]?.download_url}" alt="${data[0]?.basename}"></img>`;
      const viewFragment = editorState.data.processor.toView(imgTag);
      const modelFragment = editorState.data.toModel(viewFragment);
      editorState.model.insertContent(modelFragment);
    });
    setEditorState(null);
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div key={field.key} className="position-relative">
      <p
        onClick={() => setShow(true)}
        className={`${styles['image-upload-button']} position-absolute bottom-0 end-0 zindex-1 mb-0 cursor-pointer`}
      >
        <SVGComponent url="/assets/images/data-stream.svg" className={'bg-dark'} />
      </p>
      <ModalDAMComponent
        show={show}
        onHide={handleClose}
        onSelect={onSelect}
        type="image"
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        }}
      />
      <div className={`${styles['custom-editor']} haha`}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: {
              items: [
                'sourceEditing',
                'undo',
                'redo',
                'findAndReplace',
                'selectAll',
                '|',
                'heading',
                '|',
                'fontFamily',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'subscript',
                'superscript',
                'code',
                'removeFormat',
                '|',
                'link',
                'insertImage',
                'insertTable',
                'blockQuote',
                'codeBlock',
                'horizontalLine',
                'specialCharacters',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent',
                'alignment',
              ],
              shouldNotGroupWhenFull: true,
            },
            plugins: [
              Bold,
              Essentials,
              Italic,
              Mention,
              Paragraph,
              Undo,
              GeneralHtmlSupport,
              Image,
              ImageToolbar,
              ImageCaption,
              ImageStyle,
              ImageResize,
              LinkImage,
              SourceEditing,
              Link,
              AutoLink,
              Heading,
              Underline,
              Strikethrough,
              Subscript,
              Superscript,
              Code,
              CodeBlock,
              BlockQuote,
              List,
              TodoList,
              Indent,
              IndentBlock,
              Alignment,
              HorizontalLine,
              RemoveFormat,
              FindAndReplace,
              SelectAll,
              Table,
              TableToolbar,
              TableProperties,
              TableCellProperties,
              TableColumnResize,
              TableCaption,
              FontFamily,
              FontSize,
              FontColor,
              FontBackgroundColor,
              PasteFromOffice,
              SpecialCharacters,
              SpecialCharactersEssentials,
            ],
            table: {
              contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties',
              ],
            },
            htmlSupport: {
              allow: [
                {
                  name: /.*/,
                  attributes: true,
                  classes: true,
                  styles: true,
                },
              ],
            },
          }}
          data={field?.getValueSelected ?? ''}
          onReady={async (editor) => {
            setEditorState(editor);
            editor.editing.view.change((writer: any) => {
              writer.setStyle(
                { 'max-height': '400px', 'min-height': '200px' },
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(_event, editor) => {
            const data = editor.getData();
            field.handleChange(data);
          }}
        />
      </div>
    </div>
  );
};

export { FormEditor };
