import React from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}


class ProfileStatus extends React.Component<ProfileStatusPropsType, {}> {
    //локальный стэйт классового компонента
    state = {
        editMode: false, // переменная на отбражение/скрытие редактирования  стстуса
        status: this.props.status,
    }

//this.setState - метод React.Component, который вызывает изменение стэйта с  перерисовкой классового компонента
// (как в хуке useState у функционального)
    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (<>
            {this.state.editMode
                ? <input
                    onChange={this.onStatusChange}
                    autoFocus
                    onBlur={() => this.deactivateEditMode()}
                    value={this.state.status}
                    // type="text"
                />
                : <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "no any status"}</span>
                </div>}
        </>);
    }

}


export default ProfileStatus