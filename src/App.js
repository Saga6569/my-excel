import './index.css'
import React, { useState, useEffect } from 'react';

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Table = (props) => {

  const {height, width} = props.option;

  const arrNumber = [...Array(height + 1).keys()].slice(1);
  const arrKeyTab = arrEN.slice(0, width);

  const [letters, setLetter] = useState(arrKeyTab);
  const [numbers, setNumbers] = useState(arrNumber);
 
  const dataColl = numbers.map((number) => {
    const numIter = number
      const cells = letters.map((tab) => {
        const keyLetter = tab
        const keyNumber = number;
        const text = '';
        const state = 'open';
        const cell = {keyLetter, keyNumber, text, state}
        return cell;
      })
    return {numIter, cells}
  });

  const [table, setTable] = useState(dataColl);

  useEffect(() => {
    setTable(dataColl)
    setLetter(arrKeyTab)
    setNumbers(arrNumber)
  }, [props]);

  useEffect(() => {
    setTable(dataColl)
  }, [letters]);

  useEffect(() => {
    setTable(dataColl)
  }, [numbers]);
  
  if (height === 0 && width === 0) {
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (option) => (e) => {
    const {keyLetter, keyNumber} = option;

    const newTable = table.map((el) => {
      if (el.numIter === keyNumber) {
       el.cells.map((cell) => {
         if (cell.keyLetter === keyLetter) {
          cell.state === 'open' ?  cell.text = e.target.value : console.log('ячейка заблокирована для изменения')
         }
         return cell;
       })
      }
      return el
    })
    
    setTable(newTable);
  };
  
  const handleLooc = (option) => (e) => {
    const {keyLetter, keyNumber} = option;
    const newTable = table.map((el) => {
      if (el.numIter === keyNumber) {
       el.cells.map((cell) => {
         if (cell.keyLetter === keyLetter) {
          cell.state === 'open' ? cell.state = 'looc' : cell.state = 'open'
         }
         return cell;
       })
      }
      return el
    })
    setTable(newTable);
  };

  const handleAddLine = () => {
    const newLetters = arrEN.slice(0, letters.length + 1)
    setLetter(newLetters)
  };

  const handleAddСolumn  = () => {
    const newNumbers = [...Array(numbers.length + 2).keys()].slice(1);
    setNumbers(newNumbers)
  };
 
  const iterCell = () => {
    const collorCell = (status) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'}
    return (
      table.map((el) => {
        return <tr>
               <th>{el.numIter}</th>
               {(el.cells).map((el) => <td style={collorCell(el.state)}>
                 <input className='item' onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                </td>)}
             </tr>
     }))
   };
   
    return (<div className="App">
        <tr>
        <th>{'N/N'}</th>
          {letters.map((el) => <th>{el}</th>)}
          <button onClick={handleAddLine}>{'+'}</button>
        </tr>
        {iterCell()}
        <button onClick={handleAddСolumn}>{'+'}</button>
    </div>)
};


const App = () => {
  
  const [size, setSize] = useState({ width: 0, height: 0 });
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const result = Object.fromEntries(formData);
      if (Number(result.width) === 0 || Number(result.height) === 0) {
        console.log('error')
        return;
      }
      console.log('данные валидны');
      setSize({width: Number(result.width), height: Number(result.height)})
    };

    const form =  <div className="App">
                    <form className="form" onSubmit={handleSubmit}>
                      <p><label>Ширина таблицы </label><input name="width" type="number"></input></p>
                      <p><label>Высота таблицы </label><input name="height" type="number"></input></p>
                      <p><input type="submit" value="создать таблицу"></input></p>
                    </form>
                  </div>
    return (
      <div>
        {form}
       {<Table option={size}></Table>}
      </div>
    )

  };


export default App;


