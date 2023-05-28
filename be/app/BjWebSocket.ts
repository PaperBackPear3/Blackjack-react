import { WebSocketServer } from "ws";
import * as http from "http";
import WebSocket from 'ws';

export class BjWebSocket extends WebSocket.WebSocket {

    // send(message: string): 'send' {
    //     return 'send';
    // }

    close(): 'close' {

        return 'close';
    }

    sendGameState(gameState: string): 'sendGameState' {
        return 'sendGameState';
    }

    sendPlayerState(playerState: string): 'sendPlayerState' {
        return 'sendPlayerState';
    }

    sendPlayerAction(playerAction: string): 'sendPlayerAction' {
        return 'sendPlayerAction';
    }

    sendPlayerBet(playerBet: string): 'sendPlayerBet' {
        return 'sendPlayerBet';
    }

    sendPlayerCard(playerCard: string): 'sendPlayerCard' {
        return 'sendPlayerCard';
    }

    sendPlayerCards(playerCards: string): 'sendPlayerCards' {
        return 'sendPlayerCards';
    }
}