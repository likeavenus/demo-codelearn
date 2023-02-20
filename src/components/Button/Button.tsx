interface IButtonProps {
    onClick(): void;
}
export function Button({ onClick }: IButtonProps) {
    return <button onClick={onClick} type="button">Run code</button>
};