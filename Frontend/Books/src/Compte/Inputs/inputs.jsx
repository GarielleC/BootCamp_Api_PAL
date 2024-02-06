import PropTypes from "prop-types";

const Input = (props) => {
    const { type, name, className, value, onChange, label } = props;

    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                className={className}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
};

export default Input;
