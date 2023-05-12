import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setLoading } from "../store/features/main";

export const useDatos = (url) => {

    const [state, setState] = useState([]);

    const dispatch = useDispatch();

    const getData = () => {
        console.log(url)
        return axios
        .get(`${url}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    }

    useEffect( () =>{
        
    
        const fetchData = async () => {
            
            dispatch(setLoading(true));
			let dataRes = await getData();
            dispatch(setLoading(false));
           
            let informationRes = dataRes.map((data) => {
				return {
					...data,
					fullname: `${data.nombre} ${data.apellido}`,
				};
			});

            informationRes.sort((a,b) => a.fullname.localeCompare(b.fullname));

			setState(informationRes);
		};

        fetchData();
    },[])

    return{
        state,
        setState
    }
}