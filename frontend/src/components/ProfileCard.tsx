const ProfileCard = () => {
    return (
        <div className="bg-white rounded-[20px] p-6 flex flex-col items-center">
            {/* Profile Photo with Ring */}
            <div className="relative mb-3">
                <div className="w-[191px] h-[191px] rounded-full border-4 border-[#CC8545] p-0.5">
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>

            {/* Update Photo Link */}
            <button className="text-[14px] font-medium text-[#A14F34] hover:text-[#8a4329] font-['Rubik'] mb-4">
                Update Photo
            </button>

            {/* Name */}
            <h2 className="text-[20px] font-medium text-[#222222] font-['Rubik'] mb-1 text-center">
                Prachi desai
            </h2>

            {/* Sunbird ID */}
            <p className="text-[14px] text-[#757575] font-['Rubik'] text-center">
                Sunbird ID : prachi@gmail.com
            </p>
        </div>
    );
};

export default ProfileCard;
