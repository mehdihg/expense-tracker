import './NavBar.css'
const NavBar=({searchVal,setSearchVal})=>{
    const inputSearchHandler=(e)=>{
        setSearchVal(e.target.value)
    }
return(
    <header className="header"> 
    <div className="search">
        <input type='text' placeholder="Search" value={searchVal} onChange={inputSearchHandler}/>
    </div>

    </header>
)
}
export default NavBar