import React from "react";
import {SearchPanel} from "./seach-panel";
import {List} from "./list";
import {useEffect, useState} from "react";


const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {

    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])

    //发生变化的请求接口
    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [param])



    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}