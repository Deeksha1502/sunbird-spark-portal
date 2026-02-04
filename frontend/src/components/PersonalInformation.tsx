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
        <div className="bg-white rounded-[1.25rem] p-6">
            {/* Header with Edit */}
            <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[5px] h-5 bg-[#CC8545]" />
                    <h2 className="text-[22px] font-medium text-foreground ml-2">
                        Personal Information
                    </h2>
                </div>
                <button className="flex items-center gap-1 text-base font-medium text-sunbird-brick hover:text-sunbird-brick/90 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1819 1.00828C10.53 1.04558 10.8118 1.20721 11.0356 1.37713C11.2677 1.55699 11.5247 1.81228 11.7816 2.07171L11.9226 2.21427C12.1878 2.4737 12.4364 2.72651 12.6188 2.9619C12.8177 3.21719 13 3.54624 13 3.97227C13 4.3983 12.8177 4.72735 12.6188 4.98264C12.4364 5.21803 12.1878 5.47084 11.9226 5.73027L5.96304 11.693C5.83042 11.824 5.66465 12.003 5.44086 12.1265C5.22536 12.25 4.98498 12.3031 4.81092 12.347L2.64763 12.8874L2.63933 12.8883L2.60624 12.8974C2.48192 12.928 2.29952 12.9761 2.14204 12.9919C1.96798 13.0084 1.59497 13.0142 1.28829 12.7084C0.981618 12.4025 0.989935 12.0279 1.00651 11.8572C1.02309 11.6955 1.07281 11.5124 1.09767 11.3897L1.65304 9.1899C1.69448 9.01087 1.74422 8.7705 1.86855 8.55168C1.99288 8.33369 2.17524 8.16461 2.29957 8.03448L8.26728 2.07171C8.52422 1.81228 8.78119 1.55699 9.01327 1.37713C9.27021 1.18318 9.60173 1 10.0244 1L10.1819 1.00828Z" stroke="#CC8545" strokeWidth="2" />
                        <path d="M7.95312 2.729L10.4397 1.07129L12.9262 3.55785L11.2685 6.04441L7.95312 2.729Z" fill="#CC8545" />
                    </svg>
                    Edit
                </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Full Name */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        Full Name
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.fullName}
                        </span>
                    </div>
                </div>

                {/* Email ID */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        Email ID
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.emailId}
                        </span>
                    </div>
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        Mobile Number
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.mobileNumber}
                        </span>
                    </div>
                </div>

                {/* Designation */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        Designation
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.designation}
                        </span>
                    </div>
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        District
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.district}
                        </span>
                    </div>
                </div>

                {/* State */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                        State
                    </label>
                    <div className="border border-border rounded-lg px-4 py-2.5 h-10 flex items-center">
                        <span className="text-base font-medium text-foreground">
                            {personalInfoData.state}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
