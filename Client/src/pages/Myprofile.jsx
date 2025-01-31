import { LuUser } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

const Myprofile = () => {
  return (
    <>
      <div className="mt-10 mb-16">
        <h1 className="font-heading font-bold text-indigo-600 text-4xl text-center">
          My Profile
        </h1>
        <p className="text-center text-gray-600 mt-3">
          Manage your personal profile information.
        </p>
        <div className="border-[1px] border-gray-200 shadow-xl w-[20rem] md:w-[40rem] mt-5 mx-auto rounded-lg">
          <div className="bg-indigo-200 p-5 w-full mb-5">
            <h2 className="text-indigo-600 font-bold pl-4 ">
              Personal Information
            </h2>
          </div>
          <form className="text-sm">
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-start items-center w-[85%] mx-auto">
                <LuUser className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <label className="font-semibold" htmlFor="firstName">
                  First Name
                </label>
              </div>
              <input
                className="mx-auto w-[85%] border-[1px] border-gray-300 rounded-sm mb-4 mt-2 block py-1 px-2"
                type="text"
                id="firstName"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-start items-center w-[85%] mx-auto">
                <LuUser className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <label className="font-semibold" htmlFor="lastName">
                  Last Name
                </label>
              </div>
              <input
                className="w-[85%] mx-auto border-[1px] border-gray-300 rounded-sm mb-4 mt-2 block py-1 px-2"
                type="text"
                id="lastName"
                placeholder="Doe"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-start items-center w-[85%] mx-auto">
                <MdOutlineEmail className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <label className="font-semibold" htmlFor="emailAdress">
                  Email Adress
                </label>
              </div>
              <input
                className="w-[85%] mx-auto border-[1px] border-gray-300 rounded-sm mb-4 mt-2 block py-1 px-2"
                type="email"
                id="emailAdress"
                placeholder="john@gmail.com"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-start items-center w-[85%] mx-auto">
                <LiaBirthdayCakeSolid className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <label className="font-semibold" htmlFor="birthDate">
                  Birthday
                </label>
              </div>
              <input
                className="w-[85%] mx-auto border-[1px] border-gray-300 rounded-sm  block py-1 px-2 mt-2"
                type="date"
                id="birthDate"
              />
            </div>
            <div className="flex justify-between items-center w-[85%] mx-auto my-6">
              <div className="flex justify-start items-center">
                <TbLockPassword className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <p className="inline-block font-semibold">Password</p>
              </div>
              <button className="border-[1px] border-gray-200 rounded-sm block py-1 px-2 text-indigo-600 text-[.75rem]">
                Change Password
              </button>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-start items-center w-[85%] mx-auto">
                <TbFileDescription className="mr-[6px] inline-block text-indigo-600 text-[1rem]" />
                <label className="font-semibold" htmlFor="description">
                  Description
                </label>
              </div>
              <textarea
                className="w-[85%] mx-auto border-[1px] border-gray-300 rounded-sm mb-4 mt-2 block py-1 px-2"
                id="description"
                rows="5"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            <button
              className="text-center bg-indigo-600 text-white w-[85%] mx-auto py-2 mt-3 mb-8 rounded-md block"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
