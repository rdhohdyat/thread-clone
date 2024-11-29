const PostIcon = ({ icon, count, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-1 text-sm  text-zinc-700"
        >
            {icon}
            <p>{count}</p>
        </div>
    );
};

export default PostIcon;
