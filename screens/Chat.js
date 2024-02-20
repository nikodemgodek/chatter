import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from 'react';
import { signOut } from 'firebase/auth';
import { authentication, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { query, orderBy, addDoc } from 'firebase/firestore';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                <TouchableOpacity onPress={() => {}}>
                    <Text>logout</Text>
                </TouchableOpacity>
            }
        });
    }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsub = onSnapshot(q, snapshot => {
            console.log('snapshot');
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
            })));
        })

        return () => unsub();
    }, []);

    const onSend = useCallback( (messages = []) => {
        setMessages(prevMessages => GiftedChat.append(prevMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return(
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)} 
            user={{
                _id: authentication?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300',
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff',

            }}
        />
    )
}

export default Chat;