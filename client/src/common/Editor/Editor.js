import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import TableItem from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';

export const editorConfiguration = {
    plugins: [ CKFinder, Highlight, Essentials, Paragraph, Bold, Italic, Heading, UploadAdapter, Autoformat, BlockQuote, CKFinderUploadAdapter,
        EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, Link, List, Alignment, CodeBlock, TableItem, TableToolbar, MediaEmbed ],
    toolbar: [ 
        'heading', '|', 
        'alignment', 'bold', 'italic', 'highlight', '|', 
        'link', 'imageUpload', 'mediaEmbed', '|',
        //'bulletedList', 'numberedList', '|', 
        'codeBlock', 'blockQuote', 'insertTable', '|', 
        'undo', 'redo'
    ],
    ckfinder: {
        uploadUrl: '/board/uploadImg'
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    heading: {
        options: [
            { model: 'heading1', view: 'h1', title: '헤더1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: '헤더2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: '헤더3', class: 'ck-heading_heading3' },
            { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
        ]
    },
    highlight: {
        options: [
          {
              model: 'redPen',
              class: 'pen-red',
              title: 'Red pen',
              color: 'var(--ck-highlight-pen-red)',
              type: 'pen'
          },
          {
              model: 'greenPen',
              class: 'pen-green',
              title: 'Green pen',
              color: 'var(--ck-highlight-pen-green)',
              type: 'pen'
          },
          {
              model: 'yellowMarker',
              class: 'marker-yellow',
              title: 'Yellow marker',
              color: 'var(--ck-highlight-marker-yellow)',
              type: 'marker'
          },
          {
              model: 'greenMarker',
              class: 'marker-green',
              title: 'Green marker',
              color: 'var(--ck-highlight-marker-green)',
              type: 'marker'
          },
          {
              model: 'pinkMarker',
              class: 'marker-pink',
              title: 'Pink marker',
              color: 'var(--ck-highlight-marker-pink)',
              type: 'marker'
          },
          {
              model: 'blueMarker',
              class: 'marker-blue',
              title: 'Blue marker',
              color: 'var(--ck-highlight-marker-blue)',
              type: 'marker'
          },
        ]
    },
};