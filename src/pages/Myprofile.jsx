import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

const Myprofile = () => {
  return (
    <>
      <div className="mt-10">
        <h1 className="font-heading font-bold text-indigo-600 text-4xl text-center">
          My Profile
        </h1>
        <p className="text-center text-gray-600 mt-3">
          Manage your personal profile information.
        </p>
        <div className="border-[2px] border-indigo-600  w-fit mt-5 mx-auto">
          <div className="bg-indigo-400 p-5 border-[2px] border-indigo-600 rounded-t-md w-full">
            <h2>Personal Information</h2>
          </div>
          <form>
            <p>
              <FaRegUser className="mr-2" /> First Name
            </p>
            <input type="text" id="firstName" />
            <p>Last Name</p>
            <input type="text" id="lastName" />
            <p>Email Adress</p>
            <input type="email" id="emailAdress" />
            <p>Birthday</p>
            <input type="date" id="birthDate" />
            <div>
              <p>Password</p>
              <button>Change Password</button>
            </div>
            <p>Description</p>
            <input type="textarea" id="" />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
