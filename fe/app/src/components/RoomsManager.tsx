

export function RoomsManager({ roomId, setRoomId, isConnected, handleClickJoinRoom }: {
    roomId: string,
    setRoomId: (roomId: string) => void,
    isConnected: boolean,
    handleClickJoinRoom: () => void

}) {
    return (<>
        <input type='text' placeholder='insert roomId' value={roomId} onChange={e => setRoomId(e.target.value)} />
        <button
            onClick={handleClickJoinRoom}
            disabled={!isConnected}
        >
            Join Room
        </button>
    </>
    )
}