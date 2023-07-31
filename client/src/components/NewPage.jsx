import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';
import Header from './Header';

const NewPage = () => {
    //   const [code, setCode] = useState("");
    const [value, setValue] = useState('');
    const [customName, setCustomName] = useState('');
    const navigate = useNavigate();

    const handleChange = event => {
        setValue(event.target.value);
    };
    const handleCustomNameChange = event => {
        setCustomName(event.target.value);
    };
    useEffect(() => {
        const savedCode = localStorage.getItem('code');
        if (savedCode) {
            setValue(savedCode);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('code', value);
    }, [value]);

    const handleSave = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            console.log(token);
            let res;
            if(token){
                res = await axios.post('/api/paste', {
                content: value,
                title: customName, 
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            }   else{
                res = await axios.post('/api/paste', {
                content: value,
                title: customName,
            });
        }
            const id = customName? customName : res.data._id;

            navigate(`/${id}`);
        } catch (e) {
            console.log('Error saving: ', e);
        }
    };
    return (
        <form onSubmit={handleSave} method='POST'>
            <Header
                canSave
                handleSave={handleSave}
                handleCustomNameChange={handleCustomNameChange}
            />
            <div className='container'>
                <div className='lineNo'>&gt;</div>
                <ReactTextareaAutosize
                    autoFocus
                    name='value'
                    value={value}
                    onChange={handleChange}
                    placeholder='Start typing here...'
                />
            </div>
        </form>
    );
};

export default NewPage;
