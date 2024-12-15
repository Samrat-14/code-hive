import { create } from 'zustand';
import { Monaco } from '@monaco-editor/react';

import { CodeEditorState } from '@/types';

const getInitialState = () => {
  // if we're on the server, return default values
  if (typeof window === 'undefined') {
    return {
      language: 'javascript',
      theme: 'vs-dark',
      fontSize: 14,
    };
  }

  // if we're on the client, return values from localstorage
  return {
    language: localStorage.getItem('editor-language') || 'javascript',
    theme: localStorage.getItem('editor-theme') || 'vs-dark',
    fontSize: Number(localStorage.getItem('editor-font-size')) || 14,
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: '',
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || '',
    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem('editor-theme', theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem('editor-font-size', fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem('editor-language', language);
      set({ language, output: '', error: null });
    },

    runCode: async () => {
      // TODO
    },
  };
});
