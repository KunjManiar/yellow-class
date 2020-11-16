import React, { useEffect, useState } from 'react'
import './signin.css';
import { firebase } from '../../firebase';

import FormField from '../Widgets/FormFields/formFields';

import { submit } from '../Widgets/Alert/alert'

const SignIn = (props) => {



    // console.log(window.innerWidth)

    const [registerError, setRegisterError] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Password'
            },
            validation: {
                required: true,
                password: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    })

    const [screenSettings, setScreenSettings] = useState({})

    useEffect(() => {
        setScreenSettings({
            modalSize: window.innerWidth < 484 ? 'small' : 'large'
        })
    }, [setScreenSettings])

    const updateForm = (element) => {
        const newFormdata = {
            ...formData
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        if (element.blur) {
            let validData = validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        // this.setState({
        //     formData:newFormdata
        // })
        setFormData(newFormdata)

    }

    const validate = (element) => {
        let error = [true, ''];

        if (element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? "Hmm...that doesn't look like an email address." : ''}`;
            error = !valid ? [valid, message] : error
        }

        if (element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5' : ''}`;
            error = !valid ? [valid, message] : error
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? "You missed a spot! Don't forget to add this feild." : ''}`;
            error = !valid ? [valid, message] : error
        }

        return error;
    }

    const submitForm = (event, type) => {
        
        event.preventDefault();

        if (type !== null) {

            let dataToSubmit = {};
            //make it true to submit
            let formIsValid = false;

            if (formData === null || formData === undefined) {
                formIsValid = false;
                return;
            }
            for (let key in formData) {
                dataToSubmit[key] = formData[key].value
            }
            for (let key in formData) {
                formIsValid = formData[key].valid && formIsValid;
            }

            if (formIsValid) {
                setLoading(true);
                setRegisterError('')

                if (type) {
                    firebase.auth()
                        .signInWithEmailAndPassword(
                            dataToSubmit.email,
                            dataToSubmit.password
                        ).then(() => {
                            this.props.history.push('/')
                        }).catch(error => {
                            // this.setState({
                            //     loading:false,
                            //     registerError: error.message
                            // })
                            setLoading(false);
                            setRegisterError(error.message)
                        })

                } else {
                    firebase.auth()
                        .createUserWithEmailAndPassword(
                            dataToSubmit.email,
                            dataToSubmit.password
                        ).then(() => {
                            this.props.history.push('/')
                        }).catch(error => {
                            // this.setState({
                            //     loading:false,
                            //     registerError: error.message
                            // })
                            setLoading(false);
                            setRegisterError(error.message)
                        })
                }
            }
        }
    }

    const submitButton = () => (
        loading ?
            'loading...' :
            <div>
                <button className="login-button" onClick={(event) => submitForm(event, true)}> Log in </button>
            </div>
    )

    const showError = () => (
        registerError !== '' ?
            <div className="error" >
                {registerError}
            </div> : ''
    )

    const stopPropogationFunction = (e) => {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

    }
    // console.log(styles.logContainer)
    return (
        <div className={`logContainer pinterest-form-${screenSettings.modalSize}`} onClick={stopPropogationFunction}>
            <div className="pinterest-logo" >
                <span style={{ fontSize: 36 }} >
                    <i className="fab fa-pinterest" style={{ color: '#E60023' }}></i>
                </span>
            </div>
            <form onSubmit={(event) => submitForm(event, null)} >
                <div className={`pinterest-heading-container-${screenSettings.modalSize}`}>
                    <h3 className={`pinterest-heading-${screenSettings.modalSize}`} style={{}}> Welcome to Pinterest </h3>
                </div>
                <div className={`pinterest-form-details-container-${screenSettings.modalSize}`} >
                    <FormField
                        id={'email'}
                        formData={formData.email}
                        change={(element) => updateForm(element)}
                        size={screenSettings.modalSize}
                    />
                    <FormField
                        id={'password'}
                        formData={formData.password}
                        change={(element) => updateForm(element)}
                        size={screenSettings.modalSize}
                    />
                    <div className="forgot-password-container" onClick={submit}>
                        Forgot your password ?
                    </div>

                    {submitButton()}

                    {showError()}
                    <div>
                        <p className="or-class">
                            OR
                    </p>
                        <div className="other-logins">
                            <div className="facebook-login">
                                <button className={`facebook-button-${screenSettings.modalSize}`} onClick={submit}>
                                    <span className={`facebook-button-logo-${screenSettings.modalSize}`}>
                                        <i className="fab fa-facebook" style={{ color: '#ffffff' }}></i>
                                    </span>
                                Continue with facebook
                                </button>
                            </div>


                            <div className="google-login">
                                <button className={`google-button-${screenSettings.modalSize}`} onClick={submit}>
                                    <span className={`google-button-logo-${screenSettings.modalSize}`}><i className="fab fa-google"></i></span>
                                Continue with google
                                </button>
                                {/* <button className="">Continue with google</button> */}
                            </div>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <span className="terms"><span> By continuing, you agree to Pinterest's <a target="_blank" rel="noopener noreferrer" data-test-id="tos" href="/">Terms of Service</a>, <a target="_blank" rel="noopener noreferrer" data-test-id="privacy" href="/">Privacy policy</a>. </span></span>
                        </div>
                        <div>
                            <div className="horizontal-line"></div>
                            <div className="signup-container">
                                <a className="signup" data-test-id="login-signup-toggle">Not on Pinterest yet? Sign up</a>
                            </div>
                            <div></div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default SignIn