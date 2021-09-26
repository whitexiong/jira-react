import React from "react";

export const SearchPanel = ({users , param, setParam}) => {

  return <form action="">
    <div>
      {/*setParam(Object.assign({}, param:evt.target.value)) 和下面的语句等价 */}
      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,  //解构，类似与不定参数
        name: evt.target.value
      })}/>
      <select name="" value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}