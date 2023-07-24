function StartGame({ isDisabled, onClickStartGame }: {
    isDisabled: boolean;
    onClickStartGame: () => void;
}): JSX.Element {
    return (
        <button
            onClick={onClickStartGame}
            disabled={isDisabled}>
            Start Game
        </button>
    );
}

export default StartGame;