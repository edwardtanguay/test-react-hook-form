import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './App.scss'

function App() {
	const [formData, setFormData] = useState({});
	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
		defaultValues: {
			department: 'Sales'
		}
	});

	useEffect(() => {
		const firstName = watch('firstName');
		if (firstName === '/nk') {
			setValue('firstName', 'Nick');
			setValue('lastName', 'Kronkatch');
		}
	}, [watch('firstName')])

	return (
		<div className="App">
			<h1>Info Site</h1>

			<div className="intro">
				<p>Please fill out form.</p>
				<p>Tip: for "Nick Kronkatch", type in first name field: <code>/nk</code></p>
			</div>

			<form onSubmit={handleSubmit((data) => {
				setFormData(data);
			})}>
				<div className="row">
					<input type="text" {...register("firstName", { required: 'Please enter a first name.' })} placeholder="First Name" />
					<div className="info">{errors.firstName?.message}</div>
				</div>
				<div className="row">
					<input type="text" {...register("lastName", { required: 'Please enter a last name.', minLength: { value: 4, message: 'You need to have at least 4 characters in last name.' } })} placeholder="Last Name" />
					<div className="info">{errors.lastName?.message}</div>
				</div>
				<div className="row">
					<input type="text" {...register("department", { required: 'Please enter a department.', minLength: { value: 4, message: 'You need to have at least 4 characters in department.' } })} placeholder="Department" />
					<div className="info">{errors.department?.message}</div>
				</div>
				<button disabled={Object.keys(errors).length}>Send</button>

				{Object.keys(formData).length > 0 && (
					<div className="formData"><pre>{JSON.stringify(formData, null, 2)}</pre></div>
				)}
			</form>
		</div>
	)
}

export default App;