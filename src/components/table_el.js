import './../App.css';

function TableEl(props) {
  return (
    <ul className='T-content-el'>
      <li className='T-content-el-data'>{props.data}</li>
      <li className='T-content-el-name'>{props.name}</li>
      <li className='T-content-el-count'>{props.count}</li>
      <li className='T-content-el-distance'>{props.distance}</li>
    </ul>
  );
}

export default TableEl;
