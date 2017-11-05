import * as React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { ICrudGetAction } from '../../../shared/model/redux-action.type';
import { getUsers } from '../../../reducers/user-management';

export interface IUserManagementProps {
  isFetching?: boolean;
  getUsers: ICrudGetAction;
  users: any[];
  account: any;
}

export class UserManagement extends React.Component<IUserManagementProps, undefined> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  getUserList = () => {
    if (!this.props.isFetching) {
      this.props.getUsers();
    }
  }

  render() {
    const { users, account, isFetching } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="userManagement.home.title">Users</Translate>
          <button type="button" onClick={this.getUserList} className="btn btn-primary float-right jh-create-entity" disabled={isFetching}>
            <FaPlus /> <Translate contentKey="userManagement.home.createLabel" />
          </button>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="userManagement.login">Login</Translate></th>
                <th><Translate contentKey="userManagement.email">Email</Translate></th>
                <th />
                <th><Translate contentKey="userManagement.langKey">Lang Key</Translate></th>
                <th><Translate contentKey="userManagement.profiles">Profiles</Translate></th>
                <th><Translate contentKey="userManagement.createdDate">Created Date</Translate></th>
                <th><Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate></th>
                <th><Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
              users.map((user, i) => (
                <tr key={`user-${i}`}>
                  <td><a>{user.id}</a></td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      user.activated ? (
                        <span className="badge badge-success" style={{ cursor: 'pointer' }}>Activated</span>
                      ) : (
                        <span className="badge badge-danger" style={{ cursor: 'pointer' }}>Deactivated</span>
                      )
                    }
                  </td>
                  <td>{user.langKey}</td>
                  <td>
                    {
                      user.authorities ? (
                      user.authorities.map((authority, j) => (
                        <div key={`user-auth-${i}-${j}`}>
                          <span className="badge badge-info">{authority}</span>
                        </div>
                      ))) : null
                    }
                  </td>
                  <td>{user.createdDate}</td>
                  <td>{user.lastModifiedBy}</td>
                  <td>{user.lastModifiedDate}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <button
                        type="submit"
                        className="btn btn-info btn-sm"
                      >
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                      >
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger btn-sm" disabled={account.login === user.login}
                      >
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  users: storeState.userManagement.users,
  account: storeState.authentication.account,
  isFetching: storeState.userManagement.isFetching
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
