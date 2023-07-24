import JoinRoom from "../JoinRoom/JoinRoom";
import PlayerRoom from "../PlayersRoom/PlayerRoom";

function RoomsManager({ currentRoomId, setFrinedRoomId, isConnected, handleClickJoinRoom }: {
    currentRoomId: string,
    setFrinedRoomId: (roomId: string) => void,
    isConnected: boolean,
    handleClickJoinRoom: () => void
}):JSX.Element {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <PlayerRoom currentRoomId={currentRoomId} isConnected={isConnected} />
            <JoinRoom setFrinedRoomId={setFrinedRoomId} handleClickJoinRoom={handleClickJoinRoom} isConnected={isConnected} />
        </div>
    )
}

export default RoomsManager;