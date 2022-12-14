Клиентская части использует библеатеки react-redux, @reduxjs/toolkit, axios 

В приложении реализованы функции по сотировке полей таблицы путем нажатия кнопок заголовков таблицы, фильтрация элементов по двум всплывающим спискам, и одного поля для ввода, после нажатия на кнопку отфильтровать. Так же приложение коррректно отображается при всех разрешениях экрана.

Приложение построено по redux концепции, App.js чистая функция (почти) отвечает только за пользовательский интерфейс 
Почти, так как при инициализации приложения при пустом объекте initial_table_data в store отправляется запрос на серверный API для получения данных таблицы с сервера.

Все данные страницы хранятся в store, любые изменения вызываются через колбэки из AppContainer-а, обращением к изменениям в store через dispatch, при помощи вызова 
ActionCreator функций, которые отвечают за создание поля данных типа Action и передачи необходимых данных.

Все функции по фильтрации и сортировки выполняются в TableReducer, которая отвечает за главную страницу путем обработки case(action.type)

Чистая функция подключается к store через connect в AppContainer, из которого получает все колбеки и необходимые для отрисовки данные.

Пример для массива table Data 
[{
 id: 1,
 data: "01.01.2022",
 name: "Компания",
 count: 10,
 distance: 1000
}]

![image](https://user-images.githubusercontent.com/63459951/197208983-01349fc0-b357-45b2-976a-4f2ad19631db.png)

Так же приведу пример получаемых данных с сервера при запросе на url http://localhost:3080/api/table

![image](https://user-images.githubusercontent.com/63459951/197209306-125ffc27-9609-4ac0-835f-be1b956fce7e.png)
