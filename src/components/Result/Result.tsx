interface ResultProps {
    result: string;
}

export function Result({ result }: ResultProps) {
    return <div>Result: {result}</div>
}