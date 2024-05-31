import axios from "axios";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../app/store/store-hooks";
import { useAppSelector } from "../app/store/store-hooks";

export const useToggle = (intitialValue = false) => {
    

    const [state, setState] = useState(intitialValue);

    const toggle = useCallback(() => {
        setState((state) => !state);
    }, []);

    return[state, toggle];
}

export const useDataFetch = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.AppStateReducer.token);

    const fetch = async ({url, response}:any) => {
        // let response;
        const requestHeader = {
            headers: {
                // Authorization: "Token "  + token,
                authorization: "Bearer "  + token,
              }
        }

        // let message = "";
        // let severity = "info";

        try {
            await axios.get(url, requestHeader)
            .then((res) => {

                if(res.status === 200){
                    response = res.data;
                    // message = response.header.responseMessage;
                }
            })
            .catch((error) => {
                throw error.message;
            });
        } catch (error:any) {
            throw error.message;
        };
    

        return response;
    }

    return { fetch };
}
