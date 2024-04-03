import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import "./Home.css";

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.ref("contacts").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            setData({...snapshot.val()});
        } else {
            setData({});
        }
    })

    return () => {
        setData({});
    }
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this contact ? ")) {
      fireDb.ref(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact deleted successfully !");
        }
      })
    }
  }

  return (
    <div style={{marginTop: "100px"}}>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{alignContent: "center"}}>Serial No.</th>
                    <th style={{alignContent: "center"}}>Name</th>
                    <th style={{alignContent: "center"}}>Email</th>
                    <th style={{alignContent: "center"}}>Contact</th>
                    <th style={{alignContent: "center"}}>Action</th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{data[id].name}</td>
                      <td>{data[id].email}</td>
                      <td>{data[id].contact}</td>
                      <td>
                        <Link to={`/update/${id}`}>
                        <button className='btn btn-edit'><i class='bx bx-edit'></i></button>
                        </Link>
                        <button className='btn btn-dlt' onClick={() => onDelete(id)}><i class='bx bxs-trash'></i></button>
                        <Link to={`/view/${id}`}>
                        <button className='btn btn-view'><i class='bx bxs-show'></i></button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Home
