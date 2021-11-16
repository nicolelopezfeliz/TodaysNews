import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as Analytics from 'expo-firebase-analytics';

import * as newsAction from '../redux/actions/newsAction';
import {getData, setAmountOfClicks, setAmountOfClicksFireStore, subscribeUserFS} from "../services/firebaseService"


const Card = props => {
    let img = require('../images/news-img.jpg')
    //console.log(props)
    const dispatch = useDispatch();

    //gives us an array of times that exists in favorites 
    //some will return true or false depending if item exists in favorites
    const isFav = useSelector(state => state.news.favorites.some(article => article.url === props.url));

    //firebase/ Firebase analytics 
    useEffect(() => {
        Analytics.setCurrentScreen("Card");
        const unsubscribe = getData("anna", (clicks) => setLocalAmountOfClicks(clicks));

        //FS
        subscribeUserFS("Maria", (clicks) => setLocalClicksFS(clicks))
        //setAmountOfClicksFireStore("Maria", (clicks) => setLocalClicksFS(clicks))

        //return method is triggered when screen isisnt needed anymore 
        //when screen isint needed anymore 
        //here we unsubscribe
        return () => {
            unsubscribe();
        };
    }, [])

    const [localAmountOfClicks, setLocalAmountOfClicks] = React.useState(0);
    const [localClicksFS, setLocalClicksFS] = React.useState(0);

    return (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('NewsDetails', {
                articleUrl: props.url
            })
            Analytics.logEvent("pressing card");
            setAmountOfClicks("anna", localAmountOfClicks + 1)
            setLocalAmountOfClicks(localAmountOfClicks + 1)

            //Fire store
            setAmountOfClicksFireStore('Maria', localClicksFS + 1)
            setLocalClicksFS(localClicksFS + 1)
            }}>
            <View style={styles.card}>

                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: props.image ? props.image : 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg'}}
                        //source={img} 
                        style={styles.image}
                    />
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        {props.title && props.title.length > 22 ? props.title.slice(0, 22) + '...' : props.title}
                    </Text>

                    <MaterialIcons 
                        name={isFav ? 'favorite' : 'favorite-border'}
                        color="#111a27" size={24} 
                        onPress={() => {
                            dispatch(newsAction.toggleFavorites(props.url))
                        }}
                        />
                </View>

                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>
                        {props.description && props.description.length > 170 ? props.description.slice(0, 170) + '...' : props.description}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5
    },
    imageWrapper: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    titleWrapper: {
        height: '10%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontFamily: 'Barlow-Regular',
        fontSize: 20,
    },
    descriptionWrapper: {
        paddingHorizontal: 15
    },
    description: {
        fontFamily: 'Barlow-Light',
        fontSize: 15,
        marginTop: 10

    }

});

export default Card;