import { useState } from "react"

export default function Player({initialName,symbol}){
    const [playerName, setPlayerName] = new useState(initialName);
    const [isEditing, setIsEditing] = new useState(false);
    
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    function handleEditClick(){
        setIsEditing((isEditing) => !isEditing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    if(isEditing){
        editablePlayerName = <input type="text" value={playerName} onChange={handleChange} required/>
    }
    return(
        <li>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}