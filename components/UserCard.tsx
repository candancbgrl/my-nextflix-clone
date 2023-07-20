const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
]


type UserCardProps = {
    name: any;
}
const UserCard: React.FC<UserCardProps> = ({ name }) => {
    const image = images[Math.floor(Math.random() * 4)];
    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-xl flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img draggable={false} src={image} alt="" />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
        </div>
    );
}

export default UserCard