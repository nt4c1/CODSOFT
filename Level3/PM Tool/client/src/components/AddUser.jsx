import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
// Import your actions here, e.g., addUser and updateUser
import { addUser, updateUser } from "../../redux/actions/userActions"; 

const AddUser = ({ open, setOpen, userData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const defaultValues = userData ?? {};
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const isLoading = false; // Set this based on your loading state
  const isUpdating = false; // Set this based on your updating state

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        // Update user
        await dispatch(updateUser(data));
      } else {
        // Add new user
        await dispatch(addUser(data));
      }
      setOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting form", error);
      // Add error handling logic, e.g., show a toast message
    }
  };

  // Reset form when userData changes
  useEffect(() => {
    reset(defaultValues);
  }, [userData, reset, defaultValues]);

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Full name'
            type='text'
            name='name'
            label='Full Name'
            className='w-full rounded'
            register={register("name", { required: "Full name is required!" })}
            error={errors.name?.message}
          />
          <Textbox
            placeholder='Title'
            type='text'
            name='title'
            label='Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required!" })}
            error={errors.title?.message}
          />
          <Textbox
            placeholder='Email Address'
            type='email'
            name='email'
            label='Email Address'
            className='w-full rounded'
            register={register("email", {
              required: "Email Address is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format!",
              },
            })}
            error={errors.email?.message}
          />
          <Textbox
            placeholder='Role'
            type='text'
            name='role'
            label='Role'
            className='w-full rounded'
            register={register("role", { required: "User role is required!" })}
            error={errors.role?.message}
          />
        </div>

        {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              label='Submit'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
