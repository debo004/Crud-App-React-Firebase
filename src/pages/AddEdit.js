import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../firebase';
import {toast} from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    contact: "",
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const {id} = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({...data[id]});
    } else {
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    };
  }, [id, data]);

  const {name, email, contact} = state;

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({...state, [name]: value})
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !email || !contact) {
          toast.error("Please Add some Data into each input field");
      } else {
          if (!id) {
              fireDb.ref("contacts").push(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Details added successfully");
                }
            })
          } else {
              fireDb.ref(`contacts/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Details updated successfully");
                }
            })
          }
          setTimeout(() => navigate("/"), 500);
      }
  };
  return (
    <div>
        <div style={{marginTop: "100px"}}>
          <form style={{margin: "auto", padding: "30px 40px", maxWidth: "600px", alignContent: "center", background: '#eee', border: 'none', borderRadius: '10px', boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)"}} onSubmit={handleSubmit}>

            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name .....' value={name || ""} onChange={handleInputChange} />

            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email Id .....' value={email || ""} onChange={handleInputChange} />

            <label htmlFor='contact'>Contact</label>
            <input type='number' id='contact' name='contact' placeholder='Your Contact No. .....' value={contact || ""} onChange={handleInputChange} />

            <input type='submit' value={id ? "update" : "save"} />
            
          </form>
        </div>
    </div>
  )
}

export default AddEdit
