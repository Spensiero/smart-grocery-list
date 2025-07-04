const Header = ()=> {
return (
    <>
        <header className="flex gap-2 m-4">
            <img className="w-6 cursor-pointer" src={`${import.meta.env.BASE_URL}logo.svg`} alt="MS" title="MS"/>
            <h1 className=" font-semibold display-inline-block color-action-default">{"Megastore"}</h1>
        </header>
        <hr/>
    </>
    
);
}
export default Header;