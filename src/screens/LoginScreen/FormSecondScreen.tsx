import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './index.css';
interface IFormInput {
  email: string;
  password: string;
}
export default function FormSecondScreen() {
  const navigation = useNavigate();
  const data = useLocation();
  console.log('Data', data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    navigation('maps');
    reset();
  };

  return (
    <div className="mainFormContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm ">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" className="buttonSubmit">
          Login
        </button>
      </form>
    </div>
  );
}
