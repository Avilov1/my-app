import {useState} from "react";

const regExMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExPass = /(?=.{6,})/

export const validateEmail = (email) => regExMail.test(email)

export const validatePassword = (password) => regExPass.test(password)



