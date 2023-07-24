function JoinRoom({ header, isConnected, setFrinedRoomId, handleClickJoinRoom }: {
    header?: string
    isConnected: boolean;
    setFrinedRoomId: (roomId: string) => void;
    handleClickJoinRoom: () => void;
}): JSX.Element {
    return (
        <>
            <h2>{header || 'Join Friends Room'}</h2>
            <input type='text' placeholder='insert roomId' onChange={e => setFrinedRoomId(e.target.value)} />
            <button
                onClick={handleClickJoinRoom}
                disabled={!isConnected}
            >
                Join Room
            </button>
        </>
    )
}

export default JoinRoom;