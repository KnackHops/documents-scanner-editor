import { useContext } from "react";
import './Headers-style.css';
import { UserContext, FunctionContext, DocumentContext} from '../../wrappers/DocumentsScannerEditor';
import { useEffect, useState } from "react/cjs/react.development";
import ProfilePanel from "./ProfilePanel";
import DocumentList from "../../wrappers/DocumentList";

const Headers = ({logIn}) => {
    const classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { username, role } = useContext(UserContext);
    const { logInHandle, menuHandler, searchHandler } = useContext(FunctionContext);

    const bodyEventListener_panel = e => {
        if(e.target.className !== 'panel-btn-container' && e.target.className !== 'panel-btn' && e.target.className !== 'nav-btn'){
            if(panelStatus==='active'){
                setPanel('inactive');
            }
        }
    }

    const [panelStatus, setPanel] = useState("inactive");

    const panelClicked = (e=null) => {
        if(e){
            e.preventDefault();
        }
        panelStatus === 'active' ? setPanel("inactive") : setPanel("active");
    }

    useEffect(()=>{
        const body = document.querySelector('body');
        if(logIn){
            if(panelStatus === 'active'){
                body.addEventListener('click', bodyEventListener_panel);
            }else{
                body.removeEventListener('click', bodyEventListener_panel);
        }}
        return ()=>{
            if(panelStatus==='active'){
                body.removeEventListener('click', bodyEventListener_panel);
            }
        }
    }, [panelStatus])

    const menuClicked = e => {
        const fromWhere = e.target.getAttribute('data');
        setPanel("inactive");
        menuHandler(fromWhere);
    }

    const logOutHandler = () => {
        logInHandle();
    }
    const {documentList} = useContext(DocumentContext);
    const [searchDoc, setSearchDoc] = useState("");
    const [docsSearched, setSearched] = useState(null);

    useEffect(()=>{
        if(documentList){
            setSearched(searchHandler(documentList.documents, searchDoc, 'document'));
            console.log(docsSearched, searchDoc);
        }
    }, [searchDoc])

    useEffect(()=>{
        console.log(docsSearched)
    }, [docsSearched])

    return (
        <header className={`fd ${classForHead}`}>
            <div className="icon">
                Doc
            </div>
            {logIn ? <>
                <p className="searchbar-container">
                    <input className="searchbar" aria-label="Searchbar" type="text" value={searchDoc} onChange={e=>setSearchDoc(e.target.value)} />
                </p>
                {docsSearched ? 
                <DocumentList handler={()=>console.log("yippe")} documentList={docsSearched} /> : ""}
                <nav>
                    <ul className="fd nav-list">
                        <li><button>Scan</button></li>
                        <li><button className="nav-btn" onClick={panelClicked}>{username}</button></li>
                    </ul>
                </nav>
                <ProfilePanel 
                    panelStatus={panelStatus} 
                    menuClicked={menuClicked} 
                    logOutHandler={logOutHandler}
                    role={role}/>
            </> : ""}
        </header>
    )
}

export default Headers;