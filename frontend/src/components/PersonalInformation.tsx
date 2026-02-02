import { FiEdit2 } from "react-icons/fi";

const personalInfoData = {
    fullName: "Prachi Desai",
    emailId: "prachi@gmail.com",
    mobileNumber: "1234567890",
    designation: "Software Engineer",
    district: "Bengaluru",
    state: "Karnataka",
};

const PersonalInformation = () => {
    return (
        <div className="bg-white rounded-[20px] p-6">
            {/* Header with Edit */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-[5px] h-[20px] bg-[#CC8545] rounded-sm" />
                    <h2 className="text-[24px] font-medium text-[#222222] font-['Rubik']">
                        Personal Information
                    </h2>
                </div>
                <button className="flex items-center gap-1 text-[16px] font-medium text-[#A14F34] hover:text-[#8a4329] font-['Rubik']">
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Full Name */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        Full Name
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.fullName}
                        </span>
                    </div>
                </div>

                {/* Email ID */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        Email ID
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.emailId}
                        </span>
                    </div>
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        Mobile Number
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.mobileNumber}
                        </span>
                    </div>
                </div>

                {/* Designation */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        Designation
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.designation}
                        </span>
                    </div>
                </div>

                {/* District */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        District
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.district}
                        </span>
                    </div>
                </div>

                {/* State */}
                <div>
                    <label className="block text-[14px] text-[#757575] font-['Rubik'] mb-2">
                        State
                    </label>
                    <div className="border border-[#D7D7D7] rounded-lg px-4 py-2.5 h-[40px]">
                        <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">
                            {personalInfoData.state}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
