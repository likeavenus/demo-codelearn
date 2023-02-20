import { useState } from 'react';
import useCodeMirror from './utils/useCodeMirror';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import { Button } from '../../components/Button/Button';
import { Result } from '../../components/Result/Result';

export default function CodeEditorContainer() {
  const { ref, code } = useCodeMirror([]);
  const [result, setResult] = useState('');

  const runCode = async () => {
    try {
      const res = await fetch('http://localhost:3000/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
        }),
      });
      const data = await res.json();

      setResult(data);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <CodeEditor ref={ref} />
      <Result result={result} />
      <Button onClick={runCode} />
    </>
  )
}