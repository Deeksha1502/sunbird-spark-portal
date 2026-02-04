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
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-sunbird-ginger rounded-sm" />
                    <h2 className="text-2xl font-medium text-foreground">
                        Personal Information
                    </h2>
                </div>
                <button className="flex items-center gap-1 text-base font-medium text-sunbird-brick hover:text-sunbird-brick/90 transition-colors">
                    <FiEdit2 className="w-4 h-4" />
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
