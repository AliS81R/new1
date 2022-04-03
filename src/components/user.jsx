import React, { useState } from 'react';
import api from "../api";


const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll());
   const [count, setCount] = useState(users.length);
   
   

   const getSetClasses = () => {
       let classes = "badge ";
       classes += count === 0 ? "bg-danger m-2" : "bg-primary m-2";
       return classes;
   }
       
   const renderPhrase = () => {
       
     return count === 2|| count === 3|| count === 4 ? `${count} человека тусанут с тобой сегодня`
    : `${count} человек тусанет с тобой сегодня`
   };

   const handleDelete = (id) => { 
   setUsers((prevState) => prevState.filter((user) => user._id !== id));
   setCount(count - 1)
   
}
   
   const renderUsers = () => {
        return users.map((user) => {
        return (<tr key={user._id}
                id = {count.id}>
            <td>{user.name}</td>
            <td >     
                {user.qualities.map((item) => {
                 return <span 
                 key = {item._id} className = {`badge bg-${item.color} m-2`}
                 >{item.name}</span>
                })}
            </td>  
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <button 
                    className="btn btn-danger m-2"
                    onClick = {() => handleDelete(user._id)} >
                    delete</button>
            </td>
        </tr>)
    });
};

  
   const formatCount = () => {
       return count === 0 ? <h2>Никто не тусанет с тобой сегодня</h2> 
       : <h2>{renderPhrase ()}</h2>
   };

const renderHead = () => {
       return (
        <table 
        className='table m-2'>
           <thead>
                <tr>
                    <th>Имя</th>
                    <th>Качества</th>
                    <th>Профессия</th>
                    <th>Встретился, раз</th>
                    <th>Оценка</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers()}
                

            </tbody>
        </table>
    )};
   
return (
    <>
        <span 
        className = {getSetClasses()}>
            {formatCount()}
        </span>
        <table class = 'table'>
          {renderHead()}  
        </table>
        
    </>
);
};


export default Users;