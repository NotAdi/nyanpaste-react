import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import hljs from 'highlight.js';

const CodePage = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [lineNo, setLineNo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          let res='';
          if(id)
            res = await axios.get(`/${id}`);
          else
            res= await axios.get(`/`);

          const data = res.data;
          setLineNo([...Array(res.data.code.split('\n').length).keys()]);

          hljs.highlightAll();
          setLanguage(res.data.language);
          if (data.code) {
            setCode(data.code);
          }
        } catch (error) {
          console.error('Error fetching paste:', error);
        }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Header canSave={false} />
      <div className="container">
        <div className="lineNo">
        {lineNo.map((line) => (
          <div key={line + 1}>{line + 1}</div>
          ))}
        </div>
        <pre>
          <code id="code-main" className={language? `language-${language}`: ''}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodePage;
