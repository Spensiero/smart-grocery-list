const ItemNotFound = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="gap-2 flex items-center">{children}</div>
        </div>
    );
};
export default ItemNotFound;