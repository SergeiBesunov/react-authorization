import React from 'react';
import { useDispatch } from 'react-redux';

function ModalCanvas({children, active, setActive}){
    const DOCUMENT_BODY = React.useRef(document.body)
    const dispatch = useDispatch()
    
    const closeModal = () => {
        dispatch(setActive(false))
    }
 
    if(active){
        DOCUMENT_BODY.current.classList.add("body--hidden")
    }else{
        DOCUMENT_BODY.current.classList.remove("body--hidden")
    }
     
    return(
        <div className={`${`modal`} ${active ? `modal--active` : ''}`} onClick={closeModal}>
            <div className={`${`modal__content`} ${active ? `modal__content--active` : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalCanvas