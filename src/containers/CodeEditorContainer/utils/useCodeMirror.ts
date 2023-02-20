import { useState, useCallback, useEffect } from "react";
import { Extension, EditorState } from '@codemirror/state';
import { indentWithTab, defaultKeymap } from '@codemirror/commands';
import { basicSetup } from "codemirror";
import { keymap, EditorView } from "@codemirror/view";
import { javascript } from '@codemirror/lang-javascript';
import { java } from "@codemirror/lang-java";

type TUseCodemirror = {
    ref(node: HTMLDivElement | null): void;
    code: string;
}

export default function useCodeMirror(extensions: Extension[]): TUseCodemirror {
    const [element, setElement] = useState<HTMLElement>();
    const [code, setCode] = useState<string>('');

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;

        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;
        const onUpdate = EditorView.updateListener.of((v) => {
            setCode(v.state.doc.toString());
        });
        const view = new EditorView({

            state: EditorState.create({
                extensions: [
                    basicSetup,
                    javascript(),
                    java(),
                    keymap.of([indentWithTab]),
                    EditorView.theme({}, { dark: true }),
                    onUpdate,
                    ...extensions
                ],
            }),
            parent: element,
            doc: 'hello',
        });

        return () => view?.destroy();
    }, [element]);

    return { ref, code };
}