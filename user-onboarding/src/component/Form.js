import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const NewForm = ({ values, errors, touched, status }) => {
    const [info, setInfo] = useState([]);
    useEffect(() => {
      console.log("status has changed");
      status && setInfo(info => [...info, status]);
    }, [status]);
    return (
      <div className="new-form">
        <Form>
          <label htmlFor="name">
            NAME:
            <Field
              id="name"
              type="text"
              name="name"
            />
            {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
            )}
          </label>
          <label htmlFor="email">
            EMAIL:
            <Field
              id="email"
              type="text"
              name="email"
            />
            {touched.email && errors.email && (
            <p className email="errors">{errors.email}</p>
            )}
          </label>
          <label htmlFor="password">
            PASSWORD:
            <Field
              id="password"
              type="text"
              name="password"
            />
            {touched.password && errors.password && (
            <p className password="errors">{errors.password}</p>
            )}
          </label>
          <Field className="menu-select" 
            as="select" 
            name="menu"
            type="dropdownlist"
            >
          <option value="Menu">Select a Weapon</option>
          <option value="sword">Sword</option>
          <option value="shield">Shield</option>
          <option value="staff">Staff</option>
        </Field>
          <label className="checkbox-container" htmlFor="terms">
            DO YOU FOLLOW THE LIGHT?
            <Field
              id="terms"
              type="checkbox"
              name="terms"
              check={values.terms}
              />
            <span className="checkmark" />
            {touched.terms && errors.terms && (
            <p className terms="errors">{errors.terms}</p>
            )}
          </label>
          <button>Join the Battle!</button>
        </Form>
        {info.map(information => (
          <ul key={information.id}>
            <li>Name: {information.name}</li>
            <li>Email: {information.email}</li>
            <li>Password: {information.password}</li>
            <li>Weapon: {information.menu}</li>
            <li>Follows the Light!</li>
          </ul>
        ))}
      </div>
    );
  };

const FormikNewForm = withFormik({
    mapPropsToValues({ name, email, password, terms }){
        return {
            name: name || "",
            email: "",
            password: "",
            terms: terms || false
        };
    },
    // validationSchema: Yup.object().shape({
    //     name: Yup.string().required("This is a required field")
    // }),
    // handleSubmit(values, {setStatus, resetForm}) {
    //     console.log("submitting", values);
    //     axios.post("https://reqres.in/api/users", values).then(response => {
    //         console.log("success: ", response);
    //         setStatus(response.data).catch(error => {
    //             console.log(error.response);
    //         resetForm();
    //         });
    //     });
    // }

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required Field"),
        email: Yup.string().required("Required Field"),
        password: Yup.string().required("Required Field"),
        menu: Yup.string("")
          .oneOf(["sword", "shield", "staff"])
          .required("Select a Weapon!"),
        terms: Yup.boolean().oneOf([true], "Must Be a Follower of Light!")
      }),
      handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
          .post("https://reqres.in/api/users", values)
          .then(response => {
            console.log("success", response);
            setStatus(response.data);
            resetForm();
          })
          .catch(error => console.log(error.response));
      }
})(NewForm);

export default FormikNewForm



