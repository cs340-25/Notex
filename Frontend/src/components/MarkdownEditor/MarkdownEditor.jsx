import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownEditor.module.scss';
import remarkBreaks from "remark-breaks";
import { putData } from '../../api/DataApi';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { Note } from '../../Models/DataTypes';


export default function MarkdownEditor({ titleVal, markdownVal, noteid, folderid, favorite }) {
  const { rawData, setRawData } = useContext(WorkspaceContext);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [noteID, setNoteID] = useState(-1);
  const [folderID, setFolderID] = useState(-1);
  const [isEditMode, setIsEditMode] = useState(true);

  const wordCount = markdown.trim() === '' ? 0 : markdown.trim().split(/\s+/).length;


  useEffect(() => {
    const savedTitle = localStorage.getItem('note_title');
    const savedMarkdown = localStorage.getItem('note_markdown');
    if (savedTitle) setTitle(savedTitle);
    if (savedMarkdown) setMarkdown(savedMarkdown);
  }, []);

  useEffect(() => {
    localStorage.setItem('note_title', title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem('note_markdown', markdown);
  }, [markdown]);

  useEffect(() => {
    if (titleVal) {
      setTitle(titleVal);
    }
    if (markdownVal) {
      setMarkdown(markdownVal);
    }
    if (noteid) {
      setNoteID(noteid);
    }
    if (folderid) {
      setFolderID(folderid);
    }

  }, [titleVal, markdownVal, noteid, folderid]);

  useEffect(() => {
    setIsEditMode(true);
  }, [noteid, folderid]);


  async function saveData() {

    const data = {
      username: "testuser",
      user_id: rawData.user.id,
      note_id: noteID,
      folder_id: folderID,
      favorite: false,
      title: title,
      content: markdown,
      type: "note"
    };
    console.log("Data to be saved:", data);
    const response = await putData("testuser", data);
    if (response) {
      setRawData((prev) => {
        const updatedNotes = prev.notes.map((note) => {
          if (note.id === noteid) {
            return { ...note, title: title, content: markdown };
          }
          return note;
        });
        return { ...prev, notes: updatedNotes };
      });
      console.log("Data saved successfully:", response);
    } else {
      console.error("Error saving data:", response);
    }
  }

  useEffect(() => {
    if (!isEditMode) {
      saveData();
    }
  }, [isEditMode])



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