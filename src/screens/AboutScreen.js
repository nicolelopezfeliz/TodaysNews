import React, { useContext } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const AboutScreen = () => {

    const authContext = useContext(AuthContext);

    return (
        <View>
            <Text>About Screen</Text>
            <Button title='Logout' onPress={() => {authContext.logOut}}/> 
        </View>
    );

}

const styles = StyleSheet.create({
  
});

export default AboutScreen;