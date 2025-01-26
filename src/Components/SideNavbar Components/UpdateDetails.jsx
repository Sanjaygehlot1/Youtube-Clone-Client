import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { UpdateUserDetails } from '../../Store/AuthSlice';
import Loader from '../../Utilities/Loader';
import Button from '../Common/Button';
import Input from '../Common/Input';

function UpdateDetails() {


  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const ChangeDetails = async (data) => {
    try {
      if (data) {
        console.log(data)
        setLoading(true)
        await dispatch(UpdateUserDetails(data)).unwrap()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      throw error
    }
    
  }
  return (
    <div className="w-full max-w-sm mx-auto bg-gray-800  border-gray-500 border text-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Details</h2>
      <form onSubmit={handleSubmit(ChangeDetails)}>
        <div className="mb-6">
          <label htmlFor="name" className="block font-medium mb-2">
            Full Name
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("fullname")}
          />
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-3 bg-red-500 rounded-md text-lg font-bold hover:bg-red-600 transition duration-200"
        >
          {Loading ? <Loader /> : "Update"}

        </Button>
      </form>
    </div>
  );
}

export default UpdateDetails;
