import { parse } from "path";
import React, { createContext, useRef, useLayoutEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import { TypedDispatch, useAppDispatch, useAppSelector } from '../store/utils/store_utils';

export const SocketContext = createContext<React.MutableRefObject<WebSocket | null> | null>(null);
export const Socket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactChild;
}

function SocketProvider({ children }: SocketProviderProps) {
  // const user = useAppSelector(state => state.session.user);

  const socket = useRef<WebSocket | null>(null);
  const dispatch: TypedDispatch = useAppDispatch();

  useLayoutEffect(() => {
    // if (!user) return;
    // if (!user.email) return;
    if (socket.current) return;

    // const uuid = user.uuid;

    let websocket = new WebSocket(
        process.env.NODE_ENV === 'production' ?
        window.location.origin.replace(/^https/, 'wss') + `/socket/=${'uuid'}` :
        window.location.origin.replace(/^http/, 'ws') + `/socket/=${'uuid'}`
    );

    websocket.onopen = (e) => {
      console.log('Socket Open');
    }

    websocket.onerror = async (e) => {
      console.log('Socket Close');
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    }

    websocket.onmessage = async (e) => {
      const parse = JSON.parse(e.data);
      const payload = parse.data;

      switch (parse.type) {
        default:
          return;
      }
    }

    socket.current = websocket;
    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    }

  }, ['user', dispatch])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;