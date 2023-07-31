import axios from 'axios';
import hljs from 'highlight.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const CodePage = () => {
    const { id } = useParams();
    const [code, setCode] = useState('');
    // const [language, setLanguage] = useState('plaintext');
    const [lineNo, setLineNo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = '';
                if (id) res = await axios.get(`/api/paste/${id}`);
                else res = await axios.get(`/api/paste`);

                const data = res.data.content ? res.data.content : res.data;

                console.log(data);
                
                // setLanguage(res.data.language); 
                setLineNo([
                    ...Array(data.split('\n').length).keys(),
                ]);
                setCode(data);
                hljs.highlightAll();
            } catch (error) {
                console.error('Error fetching paste:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <Header canSave={false} />
            <div className='container'>
                <div className='lineNo'>
                    {lineNo.map(line => (
                        <div key={line + 1}>{line + 1}</div>
                    ))}
                </div>
                <pre>
                    <code
                        id='code-main'
                        className='hljs language-livecodeserver'
                    >
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodePage;
