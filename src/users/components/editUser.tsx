import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Action, Dispatch } from 'redux';

import { actionCreators, IState, IUser,
  NEW_USER_PLACEHOLDER_ID, UsersAction } from '../store';

interface IEditUserProps {
  user: IUser;
  submit: (user: IUser) => void;
}

export class EditUser extends React.Component<IEditUserProps, IUser> {
  constructor(props: IEditUserProps) {
    super(props);
    this.state = Object.assign({}, props.user);
  }

  public render() {
    return (
      <div className="edit-user">
        <h1>{this.state.id && this.state.id.length > 0 ? 'Edit' : 'Create'} User</h1>
        <form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              placeholder="Firstname"
              type="text"
              className="form-control"
              name="firstname"
              id="firstname"
              value={this.state.firstname}
              onChange={this.inputChanged}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              placeholder="Lastname"
              type="text"
              className="form-control"
              name="lastname"
              id="lastname"
              value={this.state.lastname}
              onChange={this.inputChanged}
              required={true}
            />
          </div>
          <div>
            <Link to="/users">
              <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
            {' '}
            <button 
              className="btn btn-primary" 
              type="submit" 
              onClick={this.submit} 
              disabled={this.state.firstname.length === 0 || this.state.lastname.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  private inputChanged = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as Pick<IUser, keyof IUser>);
  }

  private submit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.submit(this.state);
  }
}

export const mapStateToProps = (state: IState, props: RouteComponentProps<{ id: string }>) => ({
  user: state.users.list.find(u => u.id === props.match.params.id) || { id: '', firstname: '', lastname: '' } as IUser
});

export const mapDispatchToProps = (dispatch: Dispatch<UsersAction | Action<any>>) => ({
  submit: (u: IUser) => {
    if (u.id && u.id.length > 0) {
      dispatch(actionCreators.updateUser(u));
    }
    else {
      dispatch(actionCreators.createUser(Object.assign({}, u, { id: NEW_USER_PLACEHOLDER_ID })));
    }
    dispatch(push('/users'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( EditUser );
