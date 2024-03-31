import React, { useEffect, useState, useRef } from 'react';
import Ably, {Message} from 'ably';
import styles from './ChatComponent.module.css';

const ChatComponent: React.FC = () => {
    const [messageText, setMessageText] = useState('');
    // Use Ably's Message type directly
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
    const ablyRef = useRef<Ably.Realtime | null>(null);

    useEffect(() => {
        const ably = new Ably.Realtime("xtpzMw.xQ96UQ:Myc10hW76q9vHN1s6TjIaM5T4OYvgYRRafTLjQ5aOgs");
        ablyRef.current = ably;
        const channel = ably.channels.get('chat-room');

        // Subscribe using the correct type
        channel.subscribe((message: Message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            channel.unsubscribe();
            if (ablyRef.current) {
                ablyRef.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (!ablyRef.current) return;
        const channel = ablyRef.current.channels.get('chat-room');
        // Note: No need to pass an id here; Ably handles that
        channel.publish('message', messageText);
        setMessageText('');
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesContainer}>
                {receivedMessages.map((message, index) => (
                    <p key={index} className={`${styles.message} ${message.connectionId === ablyRef.current?.connection.id ? styles.myMessage : styles.otherMessage}`}>
                        {message.data.toString()}
                    </p>
                ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className={styles.messageForm}>
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.messageInput}
                />
                <button type="submit" disabled={!messageText.trim()} className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default ChatComponent;
