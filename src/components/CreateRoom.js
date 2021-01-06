import React from "react";
import {v1 as uuid} from "uuid";
import { useHistory } from "react-router-dom"

const CreateRoom = (props) => {

    const history = useHistory()
    console.log(history)

    function create() {
        const id = uuid();
        history.push('/room/${id}');
    }

    return (
        <button onClick={create}>Create Room</button>
    );

}

export default CreateRoom;