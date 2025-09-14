import { useState } from "react";
import { Channel, Socket } from "phoenix";
import { getApiUrl } from "../utils";

type SessionKey = `session:${string}`;
const BROADCAST_TOPIC = "broadcast" as const;

function createTopic(key: string): SessionKey {
  return `session:${key}`;
}

interface StartCallbacks {
  onStart?: () => void;
  onBroadcast?: (code: string) => void;
  onError?: () => void;
}

export function useSession() {
  const [error, setError] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  function start(
    key: string,
    { onStart, onBroadcast, onError }: StartCallbacks,
  ) {
    const route = getApiUrl() + "/sessions";

    try {
      const _socket = new Socket(route);
      _socket.connect();
      const _channel = _socket.channel(createTopic(key));

      _channel
        .join()
        .receive("ok", (_) => {
          onStart?.();
        })
        .receive("error", ({ error }: { error: string }) => {
          console.error(error);
          onError?.();
        });

      _channel.on("broadcast", ({ message }: { message: string }) => {
        onBroadcast?.(message);
      });

      setSocket(_socket);
      setChannel(_channel);
      setIsConnected(true);
    } catch (e) {
      setIsConnected(false);
      console.error(e);
      setError("Не удалось установить соединение");
    }
  }

  function stop() {
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
    }
  }

  function sendMessage(message: string) {
    channel?.push(BROADCAST_TOPIC, { message });
  }

  return {
    isConnected,
    error,
    start,
    stop,
    sendMessage,
  };
}
