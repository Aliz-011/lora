type Props = {
    name?: string;
};

const WelcomeMsg = ({ name }: Props) => {
    return (
        <div className="space-y-2 mb-2">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">
                Welcome Back, {name}
            </h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">
                This is financial overview report
            </p>
        </div>
    );
};

export default WelcomeMsg;
