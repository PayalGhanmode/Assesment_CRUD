const validateUser = (values) => {
    let errors = {};

    if (!values.firstname) {
        errors.firstname = "Fisrtname is required";
    }

    if (!values.lastname) {
        errors.lastname = "Lastname is required";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password needs to be more than 5 characters";
    }

    if (!values.profile) {
        errors.profile = "You must select Profile";
    }
    if (!values.maritialstatus) {
        errors.maritialstatus = "Maritial Status is required";
    }

    if (!values.gender) {
        errors.gender = "Gender is required";
    }

    if (!values.dob) {
        errors.dob = "DOB is required";
    }

    return errors;
};

export default validateUser;
