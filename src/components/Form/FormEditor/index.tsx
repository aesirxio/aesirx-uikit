import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import React, { useState } from 'react';

import styles from 'styles.module.scss';
import './index.scss';
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
            removePlugins: [
              'CKFinderUploadAdapter',
              'CKFinder',
              'EasyImage',
              'Image',
              'ImageCaption',
              'ImageStyle',
              'ImageToolbar',
              'ImageUpload',
              'MediaEmbed',
            ],
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
