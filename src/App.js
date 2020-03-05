import React from 'react';
import {render} from 'react-dom';
import {Field} from 'react-final-form';
import './App.css';
import Wizard from './components/Wizard';
import Error from './components/Error';
import Condition from './components/Condition';
import AutoLookup from './components/AutoLookup';
import {jsonPost} from './components/Utils';

const isRequired = (value) => (value ? undefined : 'Required');

const onSubmit = async (values) => {
  jsonPost('https://webhook.site/a5945cc3-55c7-46a3-83ed-acd0456e6f2b');
};

function App() {
  return (
    <div className="container py-5 border">
      <div className="row">
        <div className="col-12 col-md-6">
          <Wizard onSubmit={onSubmit}>
            <Wizard.Page>
              <div className="form-row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="storeType">Store Type</label>
                    <Field name="storeType" component="select" className="form-control" validate={isRequired}>
                      <option value="">Select</option>
                      <option value="Mall">Mall</option>
                      <option value="Metro">Metro</option>
                      <option value="Arcade">Arcade</option>
                      <option value="Centre">Centre</option>
                    </Field>
                    <Error name="storeType" className="invalid-feedback" />
                  </div>
                </div>
              </div>
              <Condition when="storeType" is="Metro">
                <div className="form-row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="details">Provide details</label>
                      <Field
                        name="details"
                        component="input"
                        type="text"
                        className="form-control"
                        validate={isRequired}
                      />
                      <Error name="details" className="invalid-feedback" />
                    </div>
                  </div>
                </div>
              </Condition>
              <div className="form-row">
                <div className="col-12">
                  <div className="form-group">
                    <Field label="User Lookup" name="userLookup" id="userLookup" component={AutoLookup} />
                  </div>
                </div>
              </div>
            </Wizard.Page>
            <Wizard.Page>
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <div className="form-group">
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
              </div>
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="joinedOn">Provide details</label>
                      <Field
                        name="joinedOn"
                        component="input"
                        type="date"
                        className="form-control"
                        validate={isRequired}
                      />
                      <Error name="joinedOn" className="invalid-feedback" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="form-row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor={'vicBased'}>Is this person located in Victoria ?</label>
                      <div className="form-check">
                        <label className="form-check-label">
                          <Field
                            name="vicBased"
                            component="input"
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            validate={isRequired}
                          />{' '}
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <Field
                            name="vicBased"
                            component="input"
                            className="form-check-input"
                            type="radio"
                            value="No"
                            validate={isRequired}
                          />{' '}
                          No
                        </label>
                      </div>
                      <Error name="vicBased" className="invalid-feedback" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Condition when="vicBased" is="Yes">
                  <div className="form-row">
                    <div className="col-12">
                      <div className="form-group">
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
