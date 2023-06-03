import React from 'react';

export function ConnectionState({ isConnected }: { isConnected: boolean }) {
    return (
        <div>
            <p>State: {'' + isConnected}</p>
        </div>
    )
}