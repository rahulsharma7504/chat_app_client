import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-app-server-6z4y.onrender.com", { transports: ["websocket"] });


const Socket = ()=>{
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to server');
        });
      
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
      
        return () => {
          socket.off("connect");
          socket.off("disconnect");
        };
      }, []);
      
      return socket;
}


export default socket; 