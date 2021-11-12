import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';





const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                Daily Tea
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: Platform.OS === 'android' ? '#111a27' : '#ffffff',
        padding: 15,
        borderBottomColor: Platform.OS === 'android' ? '#ffffff' : '#111a27',
        borderBottomWidth: 1
    },
    title: {
        marginTop: Platform.OS === 'android' ? 30 : 40,
        textAlign: 'center',
        fontSize: 20,
        color: Platform.OS === 'android' ? '#ffffff' : '#111a27'
    }
});

export default Header; 