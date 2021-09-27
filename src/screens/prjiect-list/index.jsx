import React from "react";
import {SearchPanel} from "./seach-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import qs from "qs";
import {clearObject} from "../../utils";


const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {

    //状态提升
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)
    const [list, setList] = useState([])

    //发生变化的请求接口
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])

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


//第一个 hook， 用 use 开头
export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, []);

}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebounceValue] = useState(value)

    useEffect(() => {
        //每次在 value 变化后设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        //每次在上一个 useEffect 处理完再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}


// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//       if(timeout){
//           clearTimeout(timeout);
//       }
//       timeout = setTimeout(function () {
//           func(...param);
//       }, delay)
//   }
// }