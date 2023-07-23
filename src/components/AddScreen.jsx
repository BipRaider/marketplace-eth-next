import { useForm } from 'react-hook-form';

const AddScreen = ({ AddContactFormProps }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(AddContactFormProps)}>
      <div className="md:col-span-1 md:flex md:justify-start flex-col bg-slate-900 h-screen text-white px-3">
        <h1 className="font-bold">Add a Contact</h1>
        <div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder="firstname"
              name="firstname"
              {...register('firstname', { required: true })}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder="lastname"
              name="lastname"
              {...register('lastname', { required: true })}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="email"
              placeholder="email"
              name="email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              id="btnAdd"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddScreen;
