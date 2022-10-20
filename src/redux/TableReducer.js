const SortTable = 'SortTable';
const OpenFilter = 'OpenFilter';
const FilterTable = 'FilterTable';
const TextAreaOnChange = 'TextAreaOnChange';
const FirstSelectValueOnChange = 'FirstSelectValueOnChange';
const SecondSelectValueOnChange = 'SecondSelectValueOnChange';
const SetTableData = 'SetTableData';
const SetPage = 'SetPage';
const RefreshPage = 'RefreshPage';


let initialstate = {
    page: 1,

    FilterData: { // поле данных для зоны фильтрации
        hidden: false,
        textareaValue: "",
        FirstSelectValue: "name",
        SecondSelectValue: "bigger",
    },
    buttonStates: { // поля данных для значений фильтрации по возрастанию или убыванию
        name: 'ascending',
        count: 'ascending',
        distance: 'ascending',
    },
    table_Data: [ // поле данных для значений таблицы

    ],
    initial_Table_Data: [ // база данных, которую мы можем получить с сервера

    ]
};

const TableReducer = (state = initialstate, action) => {
    let copystate;
    switch (action.type) {

        case SortTable: { //сортировка объектов таблицы по нажатию на кнопки заголовка
            copystate = { ...state, table_Data: [...state.table_Data], buttonStates: { ...state.buttonStates } };
            let field = action.field;
            let direction = state.buttonStates[field];
            copystate.buttonStates[field] = copystate.buttonStates[field] === 'ascending' ? 'descending' : 'ascending';
            if (copystate.table_Data !== null) {
                copystate.table_Data.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return direction === 'ascending' ? -1 : 1;
                    }
                    if (a[field] > b[field]) {
                        return direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
            return copystate;
        }
        case OpenFilter: { //кнопка открытия зоны для фильтрации
            copystate = { ...state, FilterData: { ...state.FilterData, hidden: !state.FilterData.hidden } };
            return copystate;
        }
        case FilterTable: { // фильтрация объектов таблицы по всплывающим спискам
            copystate = { ...state, table_Data: [...state.table_Data] };
            let field = state.FilterData.FirstSelectValue;
            let filter_action = state.FilterData.SecondSelectValue;
            let text = state.FilterData.textareaValue.toLowerCase();
            switch (filter_action) {
                case "equals":
                    copystate.table_Data = copystate.table_Data.filter((el) => {
                        if (el[field].toString().toLowerCase() === text.toString().toLowerCase())
                            return el;
                        else
                            return null;
                    })
                    break;

                case "haveSome":
                    copystate.table_Data = copystate.table_Data.filter((el) => {
                        if (el[field].toLowerCase().indexOf(text.toLowerCase()) > -1)
                            return el;
                        else
                            return null;
                    })
                    break;

                case "bigger":
                    copystate.table_Data = copystate.table_Data.filter(el => el[field] > state.FilterData.textareaValue);
                    break;
                case "less":
                    copystate.table_Data = copystate.table_Data.filter(el => el[field] < state.FilterData.textareaValue);
                    break;
                default: break;
            }
            return copystate;
        }
        case TextAreaOnChange: { // обработка события внесения данных в текстовое поле
            copystate = { ...state, FilterData: { ...state.FilterData, textareaValue: action.newText } };
            return copystate;
        }
        case FirstSelectValueOnChange: { // обработка события изменения значения в первом всплывающем списке
            copystate = { ...state, FilterData: { ...state.FilterData, FirstSelectValue: action.newValue } };
            return copystate;
        }
        case SecondSelectValueOnChange: { // обработка события изменения значения во втором всплывающем списке
            copystate = { ...state, FilterData: { ...state.FilterData, SecondSelectValue: action.newValue } };
            return copystate;
        }

        case SetTableData: { // заполнение значений таблицы по кнопкам пагинации
            copystate = { ...state };
            debugger;
            copystate.initial_Table_Data = [...action.data];
            copystate.table_Data = copystate.initial_Table_Data.slice(state.page * 10 - 10, state.page * 10 - 1);
            return copystate;
        }

        case SetPage: {
            copystate = { ...state, page: action.page };
            copystate.table_Data = state.initial_Table_Data.slice(action.page * 10 - 10, action.page * 10 - 1);
            return copystate;
        }
        case RefreshPage: {
            copystate = { ...state, table_Data: [...state.table_Data] };
            copystate.table_Data = state.initial_Table_Data.slice(state.page * 10 - 10, state.page * 10 - 1);
            return copystate;
        }

        default: return state;

    }


}

export const SortByCountAC = () => ({ type: SortTable, field: "count" });
export const SortByNameAC = () => ({ type: SortTable, field: "name" });
export const SortByDistanceAC = () => ({ type: SortTable, field: "distance" });
export const OpenFilterAC = () => ({ type: OpenFilter });
export const FilterBiggerAC = () => ({ type: FilterTable });
export const TextAreaOnChangeAC = (text) => ({ type: TextAreaOnChange, newText: text });
export const FirstSelectValueOnChangeAC = (value) => ({ type: FirstSelectValueOnChange, newValue: value });
export const SecondSelectValueOnChangeAC = (value) => ({ type: SecondSelectValueOnChange, newValue: value });
export const SetTableDataACreator = (data) => ({ type: SetTableData, data });
export const SetPageAC = (page) => ({ type: SetPage, page: page });
export const RefreshPageAC = () => ({ type: RefreshPage});

export default TableReducer;