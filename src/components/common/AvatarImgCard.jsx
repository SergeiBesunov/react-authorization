
function AvatarImgCard({imgUrl, onClickAvatar}) {

   return (
      <div className="selected-avatar__item-wrapper">
         <div className="selected-avatar__item">
            <button className="selected-avatar__item-but" onClick={()=>onClickAvatar(imgUrl)}>
               <img src={imgUrl} alt="img" />
            </button>
         </div>
      </div>
   );
}

export default AvatarImgCard;
