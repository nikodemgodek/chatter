import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthenticatedUserContext } from '../App';
import { useContext } from 'react';

const Home = () => {
    const navigation = useNavigation();

    const goToChat = () => {
        navigation.navigate('Chat');
    }

    const { logOut } = useContext(AuthenticatedUserContext);

    return(
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <TouchableOpacity onPress={goToChat}>
                <Text>Go To Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut}>
                <Text>Log out </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;