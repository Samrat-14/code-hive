import { create } from 'zustand';
import { Monaco } from '@monaco-editor/react';

import { CodeEditorState } from '@/types';
import { LANGUAGE_CONFIG } from '@/app/(root)/_constants';

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
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: 'Please enter some code' });
        return;
      }

      set({ isRunning: true, error: null, output: '' });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();

        // Handle API-level errors
        if (data.message) {
          set({ error: data.message, executionResult: { code, output: '', error: data.message } });
          return;
        }

        // Handle compilation errors
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({ error, executionResult: { code, output: '', error } });
          return;
        }

        // Handle runtime errors
        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({ error, executionResult: { code, output: '', error } });
          return;
        }

        // If we reach here, that means execution was successful
        const output = data.run.output;
        set({ output: output.trim(), error: null, executionResult: { code, output: output.trim(), error: null } });
      } catch (error) {
        console.log('Error running code', error);
        set({ error: 'Error running code', executionResult: { code, output: '', error: 'Error running code' } });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
