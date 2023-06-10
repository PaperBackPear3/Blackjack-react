import { toast } from "react-toastify";

export function RoomsManager({ currentRoomId, setFrinedRoomId, isConnected, handleClickJoinRoom, handleClickStartGame }: {
    currentRoomId: string,
    setFrinedRoomId: (roomId: string) => void,
    isConnected: boolean,
    handleClickJoinRoom: () => void
    handleClickStartGame: () => void,

}) {
    return (
        <>
            <h2>Your Room</h2>
            <p>{isConnected ? currentRoomId : 'not connected'}</p>
            <button onClick={() => {
                navigator.clipboard.writeText(currentRoomId);
                toast.success(currentRoomId + ' Copied to clipboard');
            }}>
                Copy
            </button>
            <h2>Join friends Room</h2>
            <input type='text' placeholder='insert roomId' onChange={e => setFrinedRoomId(e.target.value)} />
            <button
                onClick={handleClickJoinRoom}
                disabled={!isConnected}
            >
                Join Room
            </button>
            <button
                onClick={handleClickStartGame}
                disabled={!isConnected}>
                Start Game
            </button>
        </>
    )
}