import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor({value, setValue}) {
  return (
   <CKEditor
   editor={ ClassicEditor }
   data={value}
   onReady={ editor => {
       // You can store the "editor" and use when it is needed.
       console.log( 'Editor is ready to use!', editor );
   } }
   onChange={ ( event, editor ) => {
       const data = editor.getData();
       setValue(data)
   } }
/>
  )
}
