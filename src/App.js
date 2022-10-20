import './App.css';
import TableEl from './components/table_el';
import axios from "axios"


function App(props) {

    if ( props.initial_table_data.length === 0){
        axios.get("http://localhost:3080/api/table/").then(Response => {
               props.SetTableData(Response.data); 
               debugger;
        });
    }
    
    let SetPage = (e) =>{
        let pageTXT = e.target.textContent;
        let pageInt = parseInt(pageTXT);
        props.SetPage(pageInt);
    };
    let TextAreaOnChange = (e) => {
        let text = e.target.value;
        props.TextAreaOnChange(text);
    };
    let FirstSelectOnchange = (e) => {
        props.FirstSelectValueOnChange(e.target.value);
    }
    let SecondSelectOnchange = (e) => {
        props.SecondSelectValueOnChange(e.target.value);
    };
    let Table_Data_Restore = props.table_Data.map(el => <TableEl key={el.id} data={el.data} name={el.name} count={el.count} distance={el.distance} />)
    return (
        <div className="App">
            <div className='container'>
                <div className='Table-Filter'>
                    <button onClick={props.OpenFilter} className='T-Filter-Header'>Зона для фильтрации</button>
                    <div hidden={props.hidden} className='T-Filter-Content-box' >
                        <div className='T-Filter-Content' >
                            <select value={props.FirstSelectValue} onChange={FirstSelectOnchange}>
                                <option value="name">Название</option>
                                <option value="count">Количество</option>
                                <option value="distance">Расстояние</option>
                            </select>
                            <select value={props.SecondSelectValue} onChange={SecondSelectOnchange} >
                                <option value="equals">равно</option>
                                <option value="haveSome">содержит</option>
                                <option value="bigger">больше</option>
                                <option value="less">меньше</option>
                            </select>
                            <textarea value={props.TextAreaText} onChange={TextAreaOnChange}></textarea>
                            <button onClick={props.Filter}>отфильтровать</button>
                            <button onClick={props.RefreshPage}>убрать фильтр</button>
                        </div>
                    </div>
                </div>
                <div className="Table-header">
                    <button className="T-header-el">Дата</button>
                    <button onClick={props.NameSort} className="T-header-el">Название</button>
                    <button onClick={props.CountSort} className="T-header-el">Количество</button>
                    <button onClick={props.DistanceSort} className="T-header-el">Расстояние</button>
                </div>
                <div className='Table-content'>
                    {Table_Data_Restore}
                </div>
                <div className='navigation'>
                    <button onClick={SetPage}>1</button>
                    <button onClick={SetPage}>2</button>
                    <button onClick={SetPage}>3</button> 
                </div>
            </div>
        </div>
    );
}

export default App;
