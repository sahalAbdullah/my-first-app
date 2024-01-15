import './index.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput } from '../../types/form.interface';
import { useNavigate } from 'react-router-dom';

const FormHandler = () => {
  const navigation = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    navigation(`/secondForm`, { state: data });
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mainContainer mt-2">
        <label className="form-label">First Name</label>
        <div className="inputWidth">
          <input
            {...register('firstName', { required: true, maxLength: 20 })}
            className="form-control mt-1"
          />
          {errors.firstName?.type === 'required' && (
            <p role="alert" className="textError">
              First name is required
            </p>
          )}
        </div>
        <label className="form-label mt-2">Last Name</label>
        <div className="inputWidth">
          <input {...register('lastName')} className="form-control mt-1" />
        </div>
        <label className="form-label mt-2">Gender Selection</label>
        <select {...register('gender')} className="mt-2" defaultValue={'male'}>
          <option value="female" className="form-label p-5">
            Female
          </option>
          <option value="male" className="form-label">
            Male
          </option>
          <option value="other" className="form-label">
            Other
          </option>
        </select>
        <button type="submit" className="mt-4 btn btn-primary btn-lg ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormHandler;
