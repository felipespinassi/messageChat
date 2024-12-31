import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://192.168.100.7:3000");
export const WebSocketContext = createContext<Socket>(socket);
