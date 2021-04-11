import React, {useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusFC: React.FC<ProfileStatusPropsType> = (props) => {
    //локальный стэйт функционального компонента

    const [editMode, SetEditMode] = useState(false) // переменная на отбражение/скрытие редактирования  стстуса
    const [status, SetStatus] = useState(props.status)

    useEffect(() => {
        SetStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        SetEditMode(true);
    }
    const deactivateEditMode = () => {
        SetEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetStatus(e.currentTarget.value)
        ;
    }


    return <>
        {editMode
            ? <input
                onChange={onStatusChange}
                autoFocus
                onBlur={() => deactivateEditMode()}
                value={status}
                // type="text"
            />
            : <div>
                <span onDoubleClick={activateEditMode}>{props.status || "no any status"}</span>
            </div>}
    </>

}


export default ProfileStatusFC