import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(process.env.EXPO_PUBLIC_BASE_URL);
export const WebSocketContext = createContext<Socket>(socket);
