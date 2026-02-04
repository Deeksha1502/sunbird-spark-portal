const ProfileCard = () => {
    return (
        <div className="bg-white rounded-[1.25rem] p-6 flex flex-col items-center">
            {/* Profile Photo with Ring */}
            <div className="relative mb-3">
                <div className="w-[11.9375rem] h-[11.9375rem] rounded-full border-4 border-sunbird-ginger p-0.5">
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>

            {/* Update Photo Link */}
            <button className="text-sm font-medium text-sunbird-brick hover:text-sunbird-brick/90 mb-4 transition-colors">
                Update Photo
            </button>

            {/* Name */}
            <h2 className="text-xl font-medium text-foreground mb-1 text-center">
                Prachi desai
            </h2>

            {/* Sunbird ID */}
            <p className="text-sm text-muted-foreground text-center">
                Sunbird ID : prachi@gmail.com
            </p>
        </div>
    );
};

export default ProfileCard;
