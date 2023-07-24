import { toast } from "react-toastify";


function PlayerRoom({ isConnected, currentRoomId }: {
    isConnected: boolean;
    currentRoomId: string;
}): JSX.Element {
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
        </>
    )
}

export default PlayerRoom;