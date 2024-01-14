import {GET_POKE, GET_TYPE, GET_NAME, GET_DETAIL, SORT_POKEMON, SORT_POKEMONATK, ORDER_BY_ORIGIN, POST_POKE, FILTER_BY_TYPES, CLEAN, CLOSE_CARD} from "./actions-types";
import axios from "axios";

export const getPoke = () => {
    const endpoint = '/pokemons';
    return async (dispatch) => {
         const { data } = await axios(endpoint)
         return dispatch({
            type: GET_POKE,
            payload: data,
         });
    };
}

export const getTypes = () => {
   const endpoint = '/types';
   return async (dispatch) => {
      const { data } = await axios (endpoint);
      return dispatch({
         type: GET_TYPE,
         payload: data
      })
   }
}

export const getName = (name) => {
  return function (dispatch) {
    axios(`/pokemons/name?name=${name}`)
      .then(({ data }) => dispatch({ type: GET_NAME, payload: data }))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("No matching Pokemon found");
        } else {
          console.error("An error occurred:", error);
        }
      });
  };
};

export const getDetails = (id) => {
  return function (dispatch) {
      axios (`/pokemons/${id}`)
      .then (({data})=> dispatch (
          {type: GET_DETAIL, payload:data}))
          .catch((error) => {
              if (error.response && error.response.status === 500) {
                alert("No matching Pokemon found");
              } else {
                console.error("An error occurred:", error);
              }
            });
        };
      };

 export const sortAZ = (payload) => {
   return async function (dispatch){
      dispatch({
         type: SORT_POKEMON,
         payload,
      })
   }
 }

 export const sortAttack = (payload) => {
   return async function (dispatch){
      dispatch({
         type: SORT_POKEMONATK,
         payload,
      })
   }
 }

 export const orderByOrigin = (payload) => {
   return async function (dispatch){
      dispatch({
         type: ORDER_BY_ORIGIN,
         payload,
      });
   };
 };

 export const createPoke = (payload) => {
   return async (dispatch) => {
     try {
       const { data } = await axios.post("/pokemons", payload);
       return dispatch({
         type: POST_POKE,
         payload: data,
       });
     } catch (error) {
       console.log(error);
     }
   };
 };

 export const filterByTypes = (payload) => {
  return async function (dispatch){
    dispatch({
      type: FILTER_BY_TYPES,
      payload,
    });
  };
 };

 export const cleanState = (payload) => {
  return async function(dispatch){
    dispatch({
      type: CLEAN,
      payload,
    });
  };
 };

 export const closeCard = (payload) => {
  return async function(dispatch){
    dispatch({
      type: CLOSE_CARD,
      payload,
    });
  };
 };