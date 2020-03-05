import React from 'react';
import {render} from 'react-dom';
import {Field} from 'react-final-form';
import './App.css';
import Wizard from './components/Wizard';
import Error from './components/Error';
import Condition from './components/Condition';
import AutoLookup from './components/AutoLookup';

const isRequired = (value) => (value ? undefined : 'Required');

const onSubmit = async (values) => {
  function jsonPost() {
    return fetch('https://webhook.site/a5945cc3-55c7-46a3-83ed-acd0456e6f2b', {
      body: JSON.stringify(values),
      headers: {'content-type': 'application/json'},
      method: 'POST'
    }).then(function(response) {
      if (response.ok) {
        console.log(response);
      } else {
        throw new Error(`Call failed Error code ${response.status} returned with msg ${response.statusText}`);
      }
    });
  }
  jsonPost();
};

function App() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <Wizard onSubmit={onSubmit}>
            <Wizard.Page
              validate={(values) => {
                const errors = {};
                if (!values.storeType) {
                  errors.storeType = 'Required';
                }
                if (values.storeType == 'Metro' && !values.details) {
                  errors.details = 'Required';
                }
                return errors;
              }}
            >
              <div className="form-row">
                <div className="col-12">
                  <label htmlFor="storeType">Store Type</label>
                  <Field name="storeType" component="select" className="form-control">
                    <option value="">Select</option>
                    <option value="Mall">Mall</option>
                    <option value="Metro">Metro</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Centre">Centre</option>
                  </Field>
                  <Error name="storeType" className="invalid-feedback" />
                </div>
              </div>
              <Condition when="storeType" is="Metro">
                <div className="form-row">
                  <div className="col-12">
                    <label htmlFor="details">Provide details</label>
                    <Field name="details" component="input" type="text" className="form-control" />
                    <Error name="details" className="invalid-feedback" />
                  </div>
                </div>
              </Condition>
              <div className="form-row">
                <div className="col-12">
                  <Field label="User Lookup" name="userLookup" id="userLookup" component={AutoLookup} />
                </div>
              </div>
            </Wizard.Page>
            <Wizard.Page
              validate={(values) => {
                const errors = {};
                if (!values.joinedOn) {
                  errors.joinedOn = 'Required';
                }
                return errors;
              }}
            >
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <label htmlFor="userRole">What is the users role ?</label>
                    <Field name="userRole" component="select" className="form-control">
                      <option value="Dev">Dev</option>
                      <option value="Manager">Manager</option>
                      <option value="Student">Student</option>
                    </Field>
                    <Error name="userRole" className="invalid-feedback" />
                  </div>
                </div>
              </div>
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <label htmlFor="joinedOn">Provide details</label>
                    <Field name="joinedOn" component="input" type="date" className="form-control" />
                    <Error name="joinedOn" className="invalid-feedback" />
                  </div>
                </div>
              </div>
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <label htmlFor={'vicBased'}>Is this person located in Victoria ?</label>
                    <label>
                      <Field name="vicBased" component="input" type="radio" value="Yes" /> Yes
                    </label>
                    <label>
                      <Field name="vicBased" component="input" type="radio" value="No" /> No
                    </label>
                    <Error name="vicBased" className="invalid-feedback" />
                  </div>
                </div>
              </div>
              <div>
                <Condition when="vicBased" is="Yes">
                  <div className="form-row">
                    <div className="col-12">
                      <label htmlFor="details">Where in Victoria?</label>
                      <Field
                        name="location"
                        component="input"
                        type="text"
                        className="form-control"
                        validate={isRequired}
                      />
                      <Error name="location" className="invalid-feedback" />
                    </div>
                  </div>
                </Condition>
              </div>
            </Wizard.Page>
          </Wizard>
        </div>
      </div>
    </div>
  );
}

export default App;
