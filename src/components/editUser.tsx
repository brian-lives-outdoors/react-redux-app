import * as React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../store';

interface EditUserProps extends User {
  submit: (user: User) => void;
}

export class EditUser extends React.Component<EditUserProps, User> {
  constructor(props: EditUserProps) {
    super(props);
    this.state = {
      _id: props._id,
      firstname: props.firstname,
      lastname: props.lastname
    };

    this.inputChanged = this.inputChanged.bind(this);
    this.submit = this.submit.bind(this);
  }

  inputChanged(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      [e.currentTarget.name as any]: e.currentTarget.value
    });
  }

  submit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <div className="edit-user">
        <h1>{this.state._id && this.state._id.length > 0 ? 'Edit' : 'Create'} User</h1>
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
}