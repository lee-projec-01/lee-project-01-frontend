import { useEffect } from 'react';
import SockJs from 'sockjs-client'
import { Client } from '@stomp/stompjs';


function Home() {

      // 컴포넌트가 마운트될 때 axios로 게시글 리스트를 가져옵니다.
      useEffect(() => {
            
            // 채팅 기록 조회
                        // ws://localhost:8080/api/v1/sub/frame-data
                        // wss://day6.duckdns.org/api/v1/ws
        const socket = new SockJs('wss://day6.duckdns.org/api/v1/ws')
    
        const client = new Client({
            webSocketFactory : socket ,
            debug : (str) => console.log(`debug str :  ${str}`) ,
            reconnectDelay : 5000,
            onConnect : () => {
                console.log("STOMP Connected");
                client.subscribe(`wss://day6.duckdns.org/api/v1/ws` , (msg) => {
                    console.log(msg);
                })
            }
        })
    
        return client.deactivate();
    }, []);
    
    

    return (
        <div>
            <h1>Hello, World!</h1>
        </div>
    )
}

export default Home
