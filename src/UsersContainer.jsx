import { connect } from "react-redux";
import { followAC, setUsersAC, unFollowAC } from "../../Redux/UsersReduser";
import Users from "./Users";

let mapStateToProps = (state) => {
    return {
        UsersData: state.UsersPage.UsersData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {
            dispatch(followAC(id));
        },
        unFollow: (id) => {
            dispatch(unFollowAC(id));
        },
        setUsers: (usersData) => {
            dispatch(setUsersAC(usersData));
        }

    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;