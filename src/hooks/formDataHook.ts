import { useState } from "react"
import { useAppSelector } from "../app/store/store-hooks";
import { useAppDispatch } from "../app/store/store-hooks";
import axios from "axios";

export const useFormManager =  (initialState:any) => {
    const [formState, setFormState] = useState(initialState);

    const changeHandler = (event:any) => {
        setFormState({
            ...formState,
            [event.target.name] : event.target.value
        })
    }

    const elementChangeHandler = (name:any, value:any) => {
        setFormState({
            ...formState,
            [name] : value
        })
    }

    const reset = () => setFormState(initialState);

    return { changeHandler, elementChangeHandler, reset, formState };
}


export const useFormPost = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.AppStateReducer.token);

    const post = async ({url, response, data, login=false}:any) => {

        const requestHeader = {
            headers: {
                Authorization: "JWT "  + token,
                // Authorization: "Token "  + token,
              }

        }
        const requestHeaderNon = {
            headers: {
                Authorization: "JWT " ,
                // Authorization: "Token "  + token,
              }

        }

        try {
            await axios.post(url, data, login? requestHeaderNon : requestHeader)
            .then((res) => {
                if(res.status === 200){
                    response = res.data;
                }
            })
            .catch((error) => {
                // throw error.message;
                throw error
            });
        } catch (error) {
            // throw error.message;
            throw error
        }


        return response;
    }

    const put = async ({url, response, data}:any) => {

        const requestHeader = {
            headers: {
                Authorization: "JWT "  + token,
                // Authorization: "Token "  + token,
              }

        }

        try {
            await axios.put(url, data, requestHeader)
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    response = res.data;

                }
            })
            .catch((error) => {
                 throw error.message;
            });
        } catch (error:any) {
            throw error.message;
        }


        return response;
    }

    const deleteRequest = async ({url, response, data}:any) => {

        const requestHeader = {
            headers: {
                Authorization: "JWT "  + token,
                // Authorization: "Token "  + token,
              }

        }
        console.log(requestHeader);

        let message = "";
        let severity = "info";

        try {
            await axios.delete(url, requestHeader)
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    response = res.data;
                    severity = response.header.responseStatus;
                    message = response.header.responseMessage;
                }
            })
            .catch((error) => {
                throw error.message;
            });
        } catch (error:any) {
            throw error.message;
        }

        return response;
    }

    return { post, put , deleteRequest}
 }
