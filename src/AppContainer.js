import { connect } from 'react-redux';
import App from './App';
import { FilterBiggerAC, FirstSelectValueOnChangeAC, OpenFilterAC, RefreshPageAC, SecondSelectValueOnChangeAC, SetPageAC, SetTableDataACreator, SortByCountAC, SortByDistanceAC, SortByNameAC, TextAreaOnChangeAC } from './redux/TableReducer';



let mapStateToProps = (state) => {
  return {
    initial_table_data: state.TablePage.initial_Table_Data,
    table_Data: state.TablePage.table_Data,
    hidden: state.TablePage.FilterData.hidden,
    TextAreaText: state.TablePage.FilterData.textareaValue,
    FirstSelectValue: state.TablePage.FilterData.FirstSelectValue,
    SecondSelectValue: state.TablePage.FilterData.SecondSelectValue,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    CountSort: () => { dispatch(SortByCountAC()); },
    NameSort: () => { dispatch(SortByNameAC()); },
    DistanceSort: () => { dispatch(SortByDistanceAC()); },
    OpenFilter: () => { dispatch(OpenFilterAC()); },
    Filter: () => { dispatch(FilterBiggerAC()); },
    TextAreaOnChange: (text) => { dispatch(TextAreaOnChangeAC(text)); },
    FirstSelectValueOnChange: (value) => { dispatch(FirstSelectValueOnChangeAC(value)); },
    SecondSelectValueOnChange: (value) => { dispatch(SecondSelectValueOnChangeAC(value)); },
    SetTableData: (data) => { dispatch(SetTableDataACreator(data)); },
    SetPage: (page) => { dispatch(SetPageAC(page)); },
    RefreshPage: () => { dispatch(RefreshPageAC()); },
  }
}
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
