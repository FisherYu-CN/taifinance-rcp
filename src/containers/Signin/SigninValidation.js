import {createValidator, required} from 'utils/validation';

const signinValidation = createValidator({
    username: [required],
    password: [required]
});

export default signinValidation;
