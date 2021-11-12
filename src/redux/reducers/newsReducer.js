import { FETCH_ARTICLES, TOGGLE_FAVORITES } from "../actions/newsAction";

const initialState = {
    //define the states that we are going to use in ur app
    articles: [],
    favorites: []
}

export default function(state = initialState, action) {

    switch(action.type) {
        case FETCH_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }

        case TOGGLE_FAVORITES: 
            //Add or remove item from favorite 
            //if item exist this returns the index 
            //if item does not exist returns -1
            const index = state.favorites.findIndex(article => article.url === action.payload)

            if (index >= 0) {
                //item exists in favorites 
                const favorites = [...state.favorites];
                //gives copy 
                
                //removes item at that index
                favorites.splice(index, 1);

                return {
                    ...state,
                    favorites
                }
            } else {
                //item does not exist in favorite 
                //get item that we want to add - exists in list of articles 
                const article = state.articles.articles.find(article => article.url === action.payload)

                return {
                    ...state,
                    favorites: state.favorites.concat(article) //concat adds our article to array of favorites
                }
            }
    }

    return state;
}