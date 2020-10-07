import {useState} from 'react'

function FormSubmit() {

    const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		e.persist();
		setFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value.trim(),
		}));
    };
    
    
    let resetData = {};

	const handleReset = (e) => {
		e.persist();
		setFormData({ ...resetData, [e.target.name]: e.target.value });
    };
    
    return [formData, handleChange, handleReset]
}

export default FormSubmit
