import { useEffect, useState } from 'react'
import './styles/UrlFirst.css'

/*
you can try this app with these url
github.com/your_user_name
tanstack.com/query
stackoverflow.com/questions
*/

export default function UrlFirst() {

  const [urlChoice, setUrlChoice] = useState<string>("github.com");
  const [customUrl, setCustomUrl] = useState<string>("data_to_set_here");

  // derivated state
  const derivatedStateUrlChoice: string = urlChoice;
  const derivatedStateCustomUrl: string = customUrl;
  const [myUrl, setMyUrl] = useState<string>(`https://${derivatedStateUrlChoice}/${derivatedStateCustomUrl}`);

  useEffect(() => {
    const caller = () => {
      setMyUrl((prev) => prev.slice(0, 8) + derivatedStateUrlChoice);
    }
    caller();
    return () => console.log("clean-up");
  }, [urlChoice]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(event?.target.value);
  };

  const handleCutUrl = () => {
    if (urlChoice === "stackoverflow.com") {
      setMyUrl((prev) => prev.slice(0, 25));
    } else if (urlChoice === "github.com") {
      setMyUrl((prev) => prev.slice(0, 18));
    } else if (urlChoice === "tanstack.com") {
      setMyUrl((prev) => prev.slice(0, 20));
    }
    setCustomUrl("");
  };

  const handleSetUrl = () => {
    setMyUrl((prev) => prev + '/' + derivatedStateCustomUrl)
  };

  return (
    <div className='container-url'>

      <div className='box-url'>

          <div className='title-url'>
              <h1>Vite URL</h1>
          </div>
  
          <div className='link-url'>
              <div className='bg-link'></div>
              <a href={myUrl} target="_blank" rel="noopener">{myUrl}</a>
          </div>

          <div className='select-url'>
            <select name="selectsite" 
              value={urlChoice} onChange={(e) => setUrlChoice(e.target.value)}>
              <option value="github.com">github.com</option>
              <option value="tanstack.com">tanstack.com</option>
              <option value="stackoverflow.com">stackoverflow.com</option>
            </select>
          </div>

          <div className='box-inputbtnurl'>
            <input type="text" value={customUrl} onChange={(e) => handleChange(e)} />

            <div className='btn-url'>
              <button type="button" onClick={handleCutUrl}>
                {customUrl === "data_to_set_here" ? "Erase" : "Cut Url"}
              </button>
      
              <button type="button" onClick={handleSetUrl}>Set new URL</button>

            </div>
          </div>

      </div>

    </div>
  )
}
