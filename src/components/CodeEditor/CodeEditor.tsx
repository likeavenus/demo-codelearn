import React, { LegacyRef, forwardRef, RefObject } from "react";

interface ICodeEditorProps {
    ref(node: HTMLDivElement | null): void;
}
const CodeEditor = forwardRef<HTMLDivElement, ICodeEditorProps>((props, ref) => {
    return <div {...props} ref={ref} />
});

CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;
