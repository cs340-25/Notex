import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownEditor.module.scss';
import remarkBreaks from "remark-breaks";



export default function MarkdownEditor({ titleVal, markdownVal }) {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);

  const wordCount = markdown.trim() === '' ? 0 : markdown.trim().split(/\s+/).length;

  useEffect(() => {
    if(titleVal){
      setTitle(titleVal);
    }
    if(markdownVal){
      setMarkdown(markdownVal); 
    }
  },[titleVal, markdownVal]);

  return (
    <div className={styles.markdownEditorWrapper}>
      <div className={styles.markdownEditor}>
        {/* title */}
        <input
          type="text" placeholder="title" value={title}
          onChange={(e) => setTitle(e.target.value)} className={styles.markdownTitle}
        />

        {/* textarea for markdown */}
        <div className={styles.markdownBody}>
          {isEditMode && (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="body"
              className={styles.markdownTextarea}
            />
          )}

          {!isEditMode && (
            <div className={styles.markdownPreview}>
              <ReactMarkdown
                children={markdown || '*Nothing to preview*'}
                skipHtml={false}
                breaks={true}
                remarkPlugins={[remarkBreaks]}
              />
            </div>
          )}
        </div>
      </div>

      {/* footer stuff */}
      <div className={styles.markdownFooter}>
        <button onClick={() => setIsEditMode(!isEditMode)} className={styles.markdownButton}>
          {isEditMode && 'Switch to Preview'} {!isEditMode && 'Switch to Edit'}
        </button>

        <div className={styles.markdownWordcount}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </div>
      </div>
    </div>
  );
}