import { toast } from "react-toastify";

export function RoomsManager({ currentRoomId, setFrinedRoomId, isConnected, handleClickJoinRoom }: {
    currentRoomId: string,
    setFrinedRoomId: (roomId: string) => void,
    isConnected: boolean,
    handleClickJoinRoom: () => void
}) {
    return (
        <>
            <h2>Your Room</h2>
            <div className='show-player-room' style={{ display: 'inline-block' }}>
                <div>{currentRoomId}</div>
                <button onClick={() => {
                    navigator.clipboard.writeText(currentRoomId);
                    toast.success(currentRoomId + ' Copied to clipboard');
                }}>
                    Copy
                </button>
            </div>
            <h2>Join friends Room</h2>
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