import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './index.css';
import { ChangeEvent, useState } from 'react';
interface IFormInput {
  email: string;
  password: string;
}
export default function FormSecondScreen() {
  const MAX_FILES_ALLOWED = 6;
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (selectedImages.length + files.length > 6) {
        setErrorMsg('Maximum 6 images allowed.');
        return;
      }
      setErrorMsg('');
      if (selectedImages.length + files.length > MAX_FILES_ALLOWED) {
        alert(`You can select a maximum of ${MAX_FILES_ALLOWED} files.`);
        event.preventDefault();
        event.target.files = null;
      } else {
        const imagesArray = files.map((file) => URL.createObjectURL(file));
        setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
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
        <div>
          <div className="imageContainer">
            {selectedImages.map((image, index) => (
              <div key={index}>
                <img alt={`image-${index}`} width={'250px'} src={image} />
                <br />
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
          </div>
          <br />
          <div>
            <label className="fileInputLabel">
              <input
                type="file"
                name="myImage"
                onChange={handleImageChange}
                multiple
                className="fileInput"
                accept="image/*"
                disabled={selectedImages.length === 6}
              />
              Upload Image
            </label>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          </div>
        </div>
        <button type="submit" className="buttonSubmit">
          Login
        </button>
      </form>
    </div>
  );
}
